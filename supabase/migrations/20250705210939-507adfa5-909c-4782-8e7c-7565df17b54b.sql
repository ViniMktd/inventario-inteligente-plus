
-- Criar enum para status de produtos
CREATE TYPE product_status AS ENUM ('active', 'inactive', 'discontinued');

-- Criar enum para tipos de movimentação de estoque
CREATE TYPE stock_movement_type AS ENUM ('entrada', 'saida', 'ajuste', 'venda', 'devolucao');

-- Criar enum para status de vendas
CREATE TYPE sale_status AS ENUM ('pending', 'completed', 'cancelled');

-- Criar enum para métodos de pagamento
CREATE TYPE payment_method AS ENUM ('dinheiro', 'cartao_debito', 'cartao_credito', 'pix', 'outros');

-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias de produtos
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de fornecedores
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  ean TEXT UNIQUE,
  internal_code TEXT,
  category_id UUID REFERENCES public.categories(id),
  supplier_id UUID REFERENCES public.suppliers(id),
  purchase_price DECIMAL(10,2) DEFAULT 0,
  sale_price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  max_stock INTEGER,
  unit TEXT DEFAULT 'UN',
  status product_status DEFAULT 'active',
  expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de movimentações de estoque
CREATE TABLE public.stock_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  type stock_movement_type NOT NULL,
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10,2),
  reference_document TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de vendas
CREATE TABLE public.sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_number TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  customer_document TEXT,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method payment_method NOT NULL,
  status sale_status DEFAULT 'pending',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de itens de venda
CREATE TABLE public.sale_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_id UUID NOT NULL REFERENCES public.sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de XML de notas fiscais
CREATE TABLE public.xml_imports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  xml_content TEXT NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  products_imported INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xml_imports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para categorias (todos usuários autenticados)
CREATE POLICY "Authenticated users can view categories" ON public.categories
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage categories" ON public.categories
  FOR ALL TO authenticated USING (true);

-- Políticas RLS para fornecedores
CREATE POLICY "Authenticated users can view suppliers" ON public.suppliers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage suppliers" ON public.suppliers
  FOR ALL TO authenticated USING (true);

-- Políticas RLS para produtos
CREATE POLICY "Authenticated users can view products" ON public.products
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage products" ON public.products
  FOR ALL TO authenticated USING (true);

-- Políticas RLS para movimentações de estoque
CREATE POLICY "Authenticated users can view stock movements" ON public.stock_movements
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create stock movements" ON public.stock_movements
  FOR INSERT TO authenticated WITH CHECK (true);

-- Políticas RLS para vendas
CREATE POLICY "Authenticated users can view sales" ON public.sales
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage sales" ON public.sales
  FOR ALL TO authenticated USING (true);

-- Políticas RLS para itens de venda
CREATE POLICY "Authenticated users can view sale items" ON public.sale_items
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage sale items" ON public.sale_items
  FOR ALL TO authenticated USING (true);

-- Políticas RLS para XML imports
CREATE POLICY "Authenticated users can view xml imports" ON public.xml_imports
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage xml imports" ON public.xml_imports
  FOR ALL TO authenticated USING (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir algumas categorias padrão
INSERT INTO public.categories (name, description) VALUES
  ('Alimentos', 'Produtos alimentícios em geral'),
  ('Bebidas', 'Bebidas alcoólicas e não alcoólicas'),
  ('Limpeza', 'Produtos de limpeza e higiene'),
  ('Higiene', 'Produtos de higiene pessoal'),
  ('Diversos', 'Outros produtos');

-- Função para gerar número de venda automático
CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TEXT AS $$
DECLARE
    next_number INTEGER;
    sale_number TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(sale_number FROM '[0-9]+') AS INTEGER)), 0) + 1
    INTO next_number
    FROM public.sales
    WHERE sale_number ~ '^VD[0-9]+$';
    
    sale_number := 'VD' || LPAD(next_number::TEXT, 6, '0');
    RETURN sale_number;
END;
$$ LANGUAGE plpgsql;
