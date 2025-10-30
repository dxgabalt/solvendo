-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.aperturas_caja (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  caja_id uuid,
  usuario_id uuid,
  fecha_apertura timestamp with time zone DEFAULT now(),
  fecha_cierre timestamp with time zone,
  monto_inicial numeric NOT NULL DEFAULT 0,
  monto_final numeric,
  diferencia_cierre numeric,
  estado text DEFAULT 'abierta'::text CHECK (estado = ANY (ARRAY['abierta'::text, 'cerrada'::text])),
  observaciones text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT aperturas_caja_pkey PRIMARY KEY (id),
  CONSTRAINT aperturas_caja_caja_id_fkey FOREIGN KEY (caja_id) REFERENCES public.cajas(id)
);
CREATE TABLE public.archivos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  path text NOT NULL,
  tabla_origen text,
  registro_id uuid,
  empresa_id uuid NOT NULL,
  sucursal_id uuid,
  usuario_id uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT archivos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.archivos_adjuntos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  dte_id uuid,
  tipo text,
  archivo_url text,
  fecha_subida timestamp with time zone DEFAULT now(),
  CONSTRAINT archivos_adjuntos_pkey PRIMARY KEY (id),
  CONSTRAINT archivos_adjuntos_dte_id_fkey FOREIGN KEY (dte_id) REFERENCES public.dte(id)
);
CREATE TABLE public.asignaciones_tareas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  tarea_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  fecha_asignacion date DEFAULT CURRENT_DATE,
  completada boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT asignaciones_tareas_pkey PRIMARY KEY (id),
  CONSTRAINT asignaciones_tareas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT asignaciones_tareas_tarea_id_fkey FOREIGN KEY (tarea_id) REFERENCES public.tareas(id),
  CONSTRAINT asignaciones_tareas_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.asistencias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  fecha date NOT NULL,
  hora_ingreso time without time zone,
  hora_salida time without time zone,
  empresa_id uuid,
  CONSTRAINT asistencias_pkey PRIMARY KEY (id),
  CONSTRAINT asistencias_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT asistencias_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.auditoria (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid,
  tabla text NOT NULL,
  accion text NOT NULL,
  registro_id uuid,
  descripcion text,
  fecha timestamp with time zone DEFAULT now(),
  datos jsonb,
  CONSTRAINT auditoria_pkey PRIMARY KEY (id),
  CONSTRAINT auditoria_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.auditoria_inventario (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tabla text NOT NULL,
  registro_id uuid NOT NULL,
  accion text NOT NULL,
  datos_antiguos jsonb,
  datos_nuevos jsonb,
  usuario_id uuid,
  fecha timestamp with time zone DEFAULT now(),
  CONSTRAINT auditoria_inventario_pkey PRIMARY KEY (id),
  CONSTRAINT auditoria_inventario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE public.borradores_venta (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  usuario_id uuid,
  nombre text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  fecha timestamp with time zone DEFAULT now(),
  CONSTRAINT borradores_venta_pkey PRIMARY KEY (id),
  CONSTRAINT borradores_venta_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.caf_files (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  tipo_documento text NOT NULL,
  rut_empresa text NOT NULL,
  razon_social text NOT NULL,
  folio_desde integer NOT NULL,
  folio_hasta integer NOT NULL,
  fecha_autorizacion date NOT NULL,
  fecha_vencimiento date,
  caf_xml text NOT NULL,
  private_key text NOT NULL,
  public_key text NOT NULL,
  firma_caf text NOT NULL,
  activo boolean DEFAULT true,
  folios_usados integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT caf_files_pkey PRIMARY KEY (id),
  CONSTRAINT caf_files_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.cajas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  sucursal_id uuid,
  nombre text NOT NULL,
  descripcion text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cajas_pkey PRIMARY KEY (id),
  CONSTRAINT cajas_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT cajas_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.categorias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  descripcion text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categorias_pkey PRIMARY KEY (id),
  CONSTRAINT categorias_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.categorias_productos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categorias_productos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.certificados_digitales (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  certificado_p12 text NOT NULL,
  clave text NOT NULL,
  fecha_vencimiento date NOT NULL,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT certificados_digitales_pkey PRIMARY KEY (id),
  CONSTRAINT certificados_digitales_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.clientes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  razon_social text NOT NULL,
  rut text,
  direccion text,
  comuna text,
  ciudad text,
  region text,
  giro text,
  telefono text,
  email text,
  contacto text,
  nombres text,
  apellidos text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  cliente_extranjero boolean,
  tipo_cliente text,
  CONSTRAINT clientes_pkey PRIMARY KEY (id),
  CONSTRAINT clientes_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.comunicados (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  titulo text NOT NULL,
  comunicado text NOT NULL,
  programar_envio timestamp with time zone,
  destinatario text DEFAULT 'todos'::text,
  usuario_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comunicados_pkey PRIMARY KEY (id)
);
CREATE TABLE public.configuracion_pos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  deposito boolean DEFAULT true,
  reporte_ventas boolean DEFAULT false,
  devoluciones boolean DEFAULT true,
  usd boolean DEFAULT true,
  clp boolean DEFAULT false,
  mercado_pago boolean DEFAULT false,
  sumup boolean DEFAULT true,
  transbank boolean DEFAULT false,
  getnet boolean DEFAULT false,
  solicitar_autorizacion boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  sucursal_id uuid NOT NULL DEFAULT gen_random_uuid(),
  caja_id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT configuracion_pos_pkey PRIMARY KEY (empresa_id, sucursal_id, caja_id),
  CONSTRAINT configuracion_pos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT configuracion_pos_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT configuracion_pos_caja_id_fkey FOREIGN KEY (caja_id) REFERENCES public.cajas(id)
);
CREATE TABLE public.configuracion_sii (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid UNIQUE,
  rut_emisor text NOT NULL,
  razon_social_emisor text NOT NULL,
  giro_emisor text NOT NULL,
  direccion_emisor text NOT NULL,
  comuna_emisor text NOT NULL,
  ciudad_emisor text NOT NULL,
  codigo_actividad_economica text,
  ambiente text DEFAULT 'certificacion'::text CHECK (ambiente = ANY (ARRAY['certificacion'::text, 'produccion'::text])),
  url_sii_certificacion text DEFAULT 'https://maullin.sii.cl/DTEWS/'::text,
  url_sii_produccion text DEFAULT 'https://palena.sii.cl/DTEWS/'::text,
  usuario_sii text,
  clave_sii text,
  certificado_digital text,
  clave_certificado text,
  resolucion_sii text,
  fecha_resolucion date,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT configuracion_sii_pkey PRIMARY KEY (id),
  CONSTRAINT configuracion_sii_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.cotizacion_detalle (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cotizacion_id uuid,
  producto_id uuid,
  cantidad numeric NOT NULL,
  precio_unitario numeric NOT NULL,
  descuento_porcentaje numeric DEFAULT 0,
  subtotal numeric NOT NULL,
  CONSTRAINT cotizacion_detalle_pkey PRIMARY KEY (id),
  CONSTRAINT cotizacion_detalle_cotizacion_id_fkey FOREIGN KEY (cotizacion_id) REFERENCES public.cotizaciones(id)
);
CREATE TABLE public.cotizaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  cliente_id uuid,
  usuario_id uuid,
  estado text DEFAULT 'abierta'::text,
  total numeric,
  validez_dias integer DEFAULT 7,
  observaciones text,
  fecha timestamp with time zone DEFAULT now(),
  CONSTRAINT cotizaciones_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cupones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  sucursal_id uuid,
  codigo text NOT NULL UNIQUE,
  nombre text NOT NULL,
  descripcion text,
  tipo text DEFAULT 'descuento'::text,
  valor numeric,
  usos_maximos integer DEFAULT 1,
  usos_actuales integer DEFAULT 0,
  fecha_inicio date,
  fecha_fin date,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  producto_id uuid,
  CONSTRAINT cupones_pkey PRIMARY KEY (id),
  CONSTRAINT cupones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT cupones_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT cupones_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id)
);
CREATE TABLE public.demo_registrations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  rut text UNIQUE,
  razon_social text,
  direccion text,
  region text,
  comuna text,
  business_type text,
  apps ARRAY,
  employees text,
  branches integer,
  total_boxes integer,
  dte text,
  sku_count text,
  offline_mode text,
  status text DEFAULT 'pending'::text,
  last_step_completed integer DEFAULT 0,
  estimated_sku_count text,
  estimated_employees text,
  CONSTRAINT demo_registrations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.descuentos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  sucursal_id uuid,
  nombre text NOT NULL,
  descripcion text,
  tipo text DEFAULT 'porcentaje'::text,
  valor numeric NOT NULL,
  fecha_inicio date,
  fecha_fin date,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT descuentos_pkey PRIMARY KEY (id),
  CONSTRAINT descuentos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT descuentos_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.despachos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  entregado_por uuid,
  folio text,
  fecha timestamp with time zone DEFAULT now(),
  rut text,
  direccion text,
  estado text DEFAULT 'pendiente'::text,
  created_at timestamp with time zone DEFAULT now(),
  cliente_id uuid,
  CONSTRAINT despachos_pkey PRIMARY KEY (id),
  CONSTRAINT fk_despachos_clientes FOREIGN KEY (cliente_id) REFERENCES public.clientes(id)
);
CREATE TABLE public.detalles_orden_compra (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  orden_id uuid,
  producto_id uuid,
  cantidad numeric NOT NULL,
  precio_unitario numeric NOT NULL,
  subtotal numeric DEFAULT (cantidad * precio_unitario),
  CONSTRAINT detalles_orden_compra_pkey PRIMARY KEY (id),
  CONSTRAINT detalles_orden_compra_orden_id_fkey FOREIGN KEY (orden_id) REFERENCES public.ordenes_compra(id),
  CONSTRAINT detalles_orden_compra_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id)
);
CREATE TABLE public.devoluciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venta_id uuid,
  usuario_id uuid,
  tipo text CHECK (tipo = ANY (ARRAY['total'::text, 'parcial'::text])),
  motivo text,
  monto_devuelto numeric NOT NULL,
  fecha timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  empresa_id uuid,
  CONSTRAINT devoluciones_pkey PRIMARY KEY (id),
  CONSTRAINT devoluciones_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id),
  CONSTRAINT devoluciones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.devoluciones_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  devolucion_id uuid NOT NULL,
  venta_item_id uuid NOT NULL,
  cantidad numeric NOT NULL,
  razon text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT devoluciones_items_pkey PRIMARY KEY (id),
  CONSTRAINT devoluciones_items_devolucion_id_fkey FOREIGN KEY (devolucion_id) REFERENCES public.devoluciones(id),
  CONSTRAINT devoluciones_items_venta_item_id_fkey FOREIGN KEY (venta_item_id) REFERENCES public.venta_items(id)
);
CREATE TABLE public.documentos_electronicos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venta_id uuid,
  empresa_id uuid,
  tipo_documento integer NOT NULL,
  folio integer NOT NULL,
  fecha_emision date NOT NULL,
  rut_receptor text,
  razon_social_receptor text,
  direccion_receptor text,
  comuna_receptor text,
  ciudad_receptor text,
  giro_receptor text,
  monto_neto numeric DEFAULT 0,
  monto_iva numeric DEFAULT 0,
  monto_total numeric NOT NULL,
  xml_dte text,
  xml_firmado text,
  track_id text,
  estado_sii text DEFAULT 'pendiente'::text CHECK (estado_sii = ANY (ARRAY['pendiente'::text, 'enviado'::text, 'aceptado'::text, 'rechazado'::text, 'reparo'::text])),
  glosa_sii text,
  fecha_envio timestamp with time zone,
  fecha_respuesta timestamp with time zone,
  url_consulta text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documentos_electronicos_pkey PRIMARY KEY (id),
  CONSTRAINT documentos_electronicos_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id),
  CONSTRAINT documentos_electronicos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.documentos_tributarios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venta_id uuid,
  tipo text NOT NULL,
  folio text NOT NULL,
  fecha_emision timestamp with time zone DEFAULT now(),
  estado_sii text DEFAULT 'pendiente'::text,
  xml_content text,
  pdf_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documentos_tributarios_pkey PRIMARY KEY (id),
  CONSTRAINT documentos_tributarios_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id)
);
CREATE TABLE public.dte (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  orden_id uuid,
  tipo_dte integer NOT NULL,
  folio integer NOT NULL,
  rut_emisor text NOT NULL,
  rut_receptor text NOT NULL,
  razon_social_receptor text,
  fecha_emision date NOT NULL,
  monto_total numeric,
  xml text NOT NULL,
  estado text DEFAULT 'pendiente'::text,
  sii_track_id integer,
  respuesta_sii text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT dte_pkey PRIMARY KEY (id),
  CONSTRAINT dte_orden_id_fkey FOREIGN KEY (orden_id) REFERENCES public.ordenes(id)
);
CREATE TABLE public.dte_envios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  dte_id uuid,
  fecha_envio timestamp with time zone DEFAULT now(),
  track_id integer,
  estado text,
  respuesta_sii text,
  CONSTRAINT dte_envios_pkey PRIMARY KEY (id),
  CONSTRAINT dte_envios_dte_id_fkey FOREIGN KEY (dte_id) REFERENCES public.dte(id)
);
CREATE TABLE public.empresa_id_result (
  empresa_id uuid
);
CREATE TABLE public.empresas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  rut text NOT NULL UNIQUE,
  razon_social text NOT NULL,
  giro text,
  direccion text,
  comuna text,
  ciudad text,
  region text,
  telefono text,
  email text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  nombre text,
  CONSTRAINT empresas_pkey PRIMARY KEY (id)
);
CREATE TABLE public.envios_sii (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  set_dte_id text NOT NULL,
  xml_envio text NOT NULL,
  track_id text,
  estado text DEFAULT 'pendiente'::text CHECK (estado = ANY (ARRAY['pendiente'::text, 'enviado'::text, 'aceptado'::text, 'rechazado'::text])),
  glosa text,
  cantidad_documentos integer DEFAULT 0,
  fecha_envio timestamp with time zone DEFAULT now(),
  fecha_respuesta timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT envios_sii_pkey PRIMARY KEY (id),
  CONSTRAINT envios_sii_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.error_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  error_type text NOT NULL,
  error_message text NOT NULL,
  error_details jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT error_log_pkey PRIMARY KEY (id)
);
CREATE TABLE public.facturas_pedidos (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  folio text NOT NULL,
  sucursal_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT facturas_pedidos_pkey PRIMARY KEY (id),
  CONSTRAINT facturas_pedidos_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.folios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tipo_dte integer NOT NULL,
  folio_inicial integer NOT NULL,
  folio_final integer NOT NULL,
  folio_actual integer NOT NULL,
  caf_xml text NOT NULL,
  vigente boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT folios_pkey PRIMARY KEY (id)
);
CREATE TABLE public.folios_autorizados (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  tipo_documento integer NOT NULL,
  folio_desde integer NOT NULL,
  folio_hasta integer NOT NULL,
  fecha_autorizacion date NOT NULL,
  caf_xml text NOT NULL,
  folio_actual integer DEFAULT 0,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT folios_autorizados_pkey PRIMARY KEY (id),
  CONSTRAINT folios_autorizados_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.folios_electronicos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  caf_id uuid NOT NULL,
  folio integer NOT NULL,
  tipo_documento text NOT NULL,
  usado boolean DEFAULT false,
  venta_id uuid,
  fecha_uso timestamp with time zone,
  terminal_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT folios_electronicos_pkey PRIMARY KEY (id),
  CONSTRAINT folios_electronicos_caf_id_fkey FOREIGN KEY (caf_id) REFERENCES public.caf_files(id),
  CONSTRAINT folios_electronicos_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id),
  CONSTRAINT folios_electronicos_terminal_id_fkey FOREIGN KEY (terminal_id) REFERENCES public.pos_terminals(id)
);
CREATE TABLE public.impuestos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text,
  porcentaje numeric,
  es_iva boolean DEFAULT false,
  CONSTRAINT impuestos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.inventario (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  sucursal_id uuid,
  producto_id uuid,
  fecha timestamp with time zone DEFAULT now(),
  movimiento text,
  cantidad numeric,
  stock_final numeric,
  referencia text,
  usuario_id uuid,
  stock_anterior numeric DEFAULT 0,
  CONSTRAINT inventario_pkey PRIMARY KEY (id)
);
CREATE TABLE public.invitaciones_pendientes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  token uuid NOT NULL UNIQUE,
  email character varying NOT NULL,
  nombres character varying NOT NULL,
  apellidos character varying NOT NULL,
  rut character varying NOT NULL,
  empresa_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  rol character varying NOT NULL DEFAULT 'empleado'::character varying,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  fecha_nacimiento date,
  telefono character varying,
  CONSTRAINT invitaciones_pendientes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.login_methods (
  user_id uuid NOT NULL,
  email_login boolean DEFAULT true,
  rut_login boolean DEFAULT true,
  two_factor_enabled boolean DEFAULT false,
  last_login timestamp with time zone,
  login_attempts integer DEFAULT 0,
  CONSTRAINT login_methods_pkey PRIMARY KEY (user_id),
  CONSTRAINT login_methods_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.medios_pago (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  descripcion text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT medios_pago_pkey PRIMARY KEY (id),
  CONSTRAINT medios_pago_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.mermas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  sucursal_id uuid NOT NULL,
  producto_id uuid NOT NULL,
  tipo text,
  cantidad numeric NOT NULL,
  observacion text,
  fecha timestamp with time zone DEFAULT now(),
  empresa_id uuid,
  CONSTRAINT mermas_pkey PRIMARY KEY (id),
  CONSTRAINT mermas_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.metodos_pago (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  tipo character varying DEFAULT 'visa'::character varying,
  numero_enmascarado character varying DEFAULT 'XXXX-XXXX-XXXX-0000'::character varying,
  es_principal boolean DEFAULT true,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT metodos_pago_pkey PRIMARY KEY (id),
  CONSTRAINT metodos_pago_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.migration_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  demo_registration_id uuid,
  email text,
  status text,
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT migration_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.movimientos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  producto_uuid uuid,
  cantidad integer NOT NULL,
  tipo_movimiento text CHECK (tipo_movimiento = ANY (ARRAY['entrada'::text, 'salida'::text])),
  fecha timestamp with time zone DEFAULT now(),
  usuario_id uuid,
  CONSTRAINT movimientos_pkey PRIMARY KEY (id),
  CONSTRAINT movimientos_producto_uuid_fkey FOREIGN KEY (producto_uuid) REFERENCES public.productos(id),
  CONSTRAINT movimientos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES auth.users(id)
);
CREATE TABLE public.movimientos_caja (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['ingreso'::text, 'retiro'::text, 'venta'::text])),
  monto numeric NOT NULL,
  observacion text,
  fecha timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  empresa_id uuid,
  sesiones_caja_id uuid,
  sucursal_id uuid DEFAULT gen_random_uuid(),
  caja_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT movimientos_caja_pkey PRIMARY KEY (id),
  CONSTRAINT movimientos_caja_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT movimientos_caja_sesiones_caja_id_fkey FOREIGN KEY (sesiones_caja_id) REFERENCES public.sesiones_caja(id),
  CONSTRAINT movimientos_caja_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT movimientos_caja_caja_id_fkey FOREIGN KEY (caja_id) REFERENCES public.cajas(id)
);
CREATE TABLE public.notificaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  tipo text NOT NULL,
  titulo text NOT NULL,
  mensaje text NOT NULL,
  producto_id uuid,
  terminal_id uuid,
  prioridad text DEFAULT 'media'::text,
  leida boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  sucursal_id uuid DEFAULT gen_random_uuid(),
  usuario_id uuid,
  sesion_caja_id uuid,
  CONSTRAINT notificaciones_pkey PRIMARY KEY (id),
  CONSTRAINT notificaciones_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT notificaciones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT fk_notificaciones_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.orden_compra_detalle (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  orden_compra_id uuid,
  producto_id uuid,
  cantidad numeric NOT NULL,
  precio_unitario numeric NOT NULL,
  subtotal numeric NOT NULL,
  CONSTRAINT orden_compra_detalle_pkey PRIMARY KEY (id),
  CONSTRAINT orden_compra_detalle_orden_compra_id_fkey FOREIGN KEY (orden_compra_id) REFERENCES public.ordenes_compra(id)
);
CREATE TABLE public.orden_detalle (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  orden_id uuid,
  producto_id uuid,
  cantidad numeric NOT NULL,
  precio_unitario numeric NOT NULL,
  subtotal numeric NOT NULL,
  CONSTRAINT orden_detalle_pkey PRIMARY KEY (id),
  CONSTRAINT orden_detalle_orden_id_fkey FOREIGN KEY (orden_id) REFERENCES public.ordenes(id)
);
CREATE TABLE public.ordenes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cliente_id uuid,
  usuario_id uuid,
  estado text DEFAULT 'pendiente'::text,
  total numeric,
  fecha timestamp with time zone DEFAULT now(),
  observaciones text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ordenes_pkey PRIMARY KEY (id),
  CONSTRAINT ordenes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id)
);
CREATE TABLE public.ordenes_compra (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  proveedor_id uuid,
  usuario_id uuid,
  estado text DEFAULT 'pendiente'::text,
  total numeric,
  fecha timestamp with time zone DEFAULT now(),
  observaciones text,
  CONSTRAINT ordenes_compra_pkey PRIMARY KEY (id),
  CONSTRAINT ordenes_compra_proveedor_id_fkey FOREIGN KEY (proveedor_id) REFERENCES public.proveedores(id)
);
CREATE TABLE public.pagos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  orden_id uuid,
  medio_pago_id uuid,
  monto numeric NOT NULL,
  fecha timestamp with time zone DEFAULT now(),
  referencia text,
  usuario_id uuid,
  CONSTRAINT pagos_pkey PRIMARY KEY (id),
  CONSTRAINT pagos_orden_id_fkey FOREIGN KEY (orden_id) REFERENCES public.ordenes(id)
);
CREATE TABLE public.parametros_empresa (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  valor text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT parametros_empresa_pkey PRIMARY KEY (id)
);
CREATE TABLE public.payment_providers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider_type text NOT NULL,
  api_key_encrypted text,
  webhook_url text,
  is_active boolean DEFAULT true,
  configuration jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_providers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pedidos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  proveedor_id uuid,
  fecha_pedido timestamp with time zone DEFAULT now(),
  fecha_entrega timestamp with time zone,
  estado text DEFAULT 'pendiente'::text,
  total numeric,
  created_at timestamp with time zone DEFAULT now(),
  folio text,
  fecha timestamp with time zone DEFAULT now(),
  sucursal_id uuid,
  razon_social text,
  proveedor text,
  archivo_respaldo text,
  productos jsonb,
  proveedor_nombre text,
  proveedor_rut text,
  proveedor_direccion text,
  proveedor_telefono text,
  archivos_respaldo text,
  CONSTRAINT pedidos_pkey PRIMARY KEY (id),
  CONSTRAINT pedidos_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT pedidos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.permisos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  descripcion text,
  modulo text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT permisos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.planes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre character varying DEFAULT 'Plan Personalizado'::character varying,
  limite_empleados integer,
  limite_productos integer,
  api_pasarelas boolean DEFAULT true,
  dte_ilimitadas boolean DEFAULT false,
  precio numeric,
  created_at timestamp with time zone DEFAULT now(),
  acceso_backoffice boolean DEFAULT true,
  control_inventario boolean DEFAULT true,
  pos_habilitado boolean DEFAULT false,
  app_colaboradores boolean DEFAULT false,
  reportes_avanzados boolean DEFAULT false,
  CONSTRAINT planes_pkey PRIMARY KEY (id),
  CONSTRAINT planes_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.pos_sync_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  terminal_id uuid NOT NULL,
  sync_type text NOT NULL,
  direction text NOT NULL,
  status text DEFAULT 'pending'::text,
  records_count integer DEFAULT 0,
  error_message text,
  sync_data jsonb,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  CONSTRAINT pos_sync_log_pkey PRIMARY KEY (id),
  CONSTRAINT pos_sync_log_terminal_id_fkey FOREIGN KEY (terminal_id) REFERENCES public.pos_terminals(id)
);
CREATE TABLE public.pos_terminals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  terminal_code text NOT NULL UNIQUE,
  terminal_name text NOT NULL,
  ip_address inet,
  mac_address text,
  status text DEFAULT 'offline'::text,
  last_sync timestamp with time zone,
  payment_providers ARRAY DEFAULT ARRAY[]::uuid[],
  configuration jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pos_terminals_pkey PRIMARY KEY (id),
  CONSTRAINT pos_terminals_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT pos_terminals_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.pos_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  terminal_id uuid NOT NULL,
  venta_id uuid,
  transaction_type text NOT NULL,
  payment_provider_id uuid,
  external_transaction_id text,
  amount numeric NOT NULL,
  currency text DEFAULT 'CLP'::text,
  payment_method text,
  status text DEFAULT 'pending'::text,
  provider_response jsonb,
  processed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pos_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT pos_transactions_payment_provider_id_fkey FOREIGN KEY (payment_provider_id) REFERENCES public.payment_providers(id),
  CONSTRAINT pos_transactions_terminal_id_fkey FOREIGN KEY (terminal_id) REFERENCES public.pos_terminals(id),
  CONSTRAINT pos_transactions_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id)
);
CREATE TABLE public.productos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  codigo text,
  nombre text NOT NULL,
  descripcion text,
  precio text,
  costo text,
  stock integer DEFAULT 0,
  stock_minimo integer DEFAULT 0,
  destacado boolean DEFAULT false,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  tipo text DEFAULT 'producto'::text,
  unidad text DEFAULT 'UN'::text,
  sucursal_id uuid,
  categoria_id uuid,
  CONSTRAINT productos_pkey PRIMARY KEY (id),
  CONSTRAINT productos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT productos_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT fk_productos_categoria FOREIGN KEY (categoria_id) REFERENCES public.categorias(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  email text UNIQUE,
  company text,
  rut text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.promociones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  descripcion text,
  precio numeric,
  fecha_inicio date,
  fecha_fin date,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  disponible boolean DEFAULT true,
  precio_prom numeric DEFAULT 0,
  productos_id ARRAY,
  sucursales_id ARRAY DEFAULT '{}'::uuid[],
  CONSTRAINT promociones_pkey PRIMARY KEY (id),
  CONSTRAINT promociones_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.proveedores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  razon_social text NOT NULL,
  rut text NOT NULL UNIQUE,
  direccion text,
  ciudad text,
  telefono text,
  email text,
  contacto text,
  usuario_id uuid,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT proveedores_pkey PRIMARY KEY (id),
  CONSTRAINT proveedores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.users(id)
);
CREATE TABLE public.roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  permisos jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.roles_permisos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  rol text NOT NULL,
  modulo text NOT NULL,
  puede_leer boolean DEFAULT false,
  puede_escribir boolean DEFAULT false,
  puede_borrar boolean DEFAULT false,
  CONSTRAINT roles_permisos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.sesiones_caja (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  caja_id uuid NOT NULL,
  usuario_id uuid NOT NULL,
  sucursal_id uuid,
  estado character varying NOT NULL CHECK (estado::text = ANY (ARRAY['abierta'::character varying, 'cerrada'::character varying, 'pendiente_aprobacion'::character varying]::text[])),
  saldo_inicial numeric NOT NULL,
  saldo_final numeric,
  monto_efectivo numeric DEFAULT 0,
  monto_tarjeta numeric DEFAULT 0,
  monto_transferencia numeric DEFAULT 0,
  monto_otros numeric DEFAULT 0,
  observaciones text,
  abierta_en timestamp with time zone DEFAULT now(),
  cerrada_en timestamp with time zone,
  cerrada_por uuid,
  creada_en timestamp with time zone DEFAULT now(),
  actualizada_en timestamp with time zone DEFAULT now(),
  inicializada boolean DEFAULT false,
  CONSTRAINT sesiones_caja_pkey PRIMARY KEY (id),
  CONSTRAINT sesiones_caja_caja_id_fkey FOREIGN KEY (caja_id) REFERENCES public.cajas(id),
  CONSTRAINT sesiones_caja_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT sesiones_caja_usuario_id_fkey1 FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.solicitudes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  tipo text,
  descripcion text,
  estado text DEFAULT 'pendiente'::text,
  fecha_creacion timestamp with time zone DEFAULT now(),
  CONSTRAINT solicitudes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.solicitudes_vacaciones (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  numero_solicitud text NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  dias_solicitados integer NOT NULL,
  motivo text,
  estado text DEFAULT 'pendiente'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT solicitudes_vacaciones_pkey PRIMARY KEY (id),
  CONSTRAINT solicitudes_vacaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.sucursales (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  nombre text NOT NULL,
  direccion text,
  comuna text,
  ciudad text,
  telefono text,
  email text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sucursales_pkey PRIMARY KEY (id),
  CONSTRAINT sucursales_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.system_config (
  key character varying NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT system_config_pkey PRIMARY KEY (key)
);
CREATE TABLE public.tareas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  nombre text NOT NULL,
  descripcion text,
  tipo text DEFAULT 'limpieza'::text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tareas_pkey PRIMARY KEY (id)
);
CREATE TABLE public.terminal_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  terminal_id uuid NOT NULL,
  usuario_id uuid NOT NULL,
  session_start timestamp with time zone DEFAULT now(),
  session_end timestamp with time zone,
  cash_opening numeric,
  cash_closing numeric,
  total_sales numeric DEFAULT 0,
  total_transactions integer DEFAULT 0,
  status text DEFAULT 'active'::text,
  CONSTRAINT terminal_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT terminal_sessions_terminal_id_fkey FOREIGN KEY (terminal_id) REFERENCES public.pos_terminals(id),
  CONSTRAINT terminal_sessions_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id)
);
CREATE TABLE public.turnos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  sucursal_id uuid NOT NULL,
  fecha date NOT NULL,
  hora_inicio time without time zone,
  hora_fin time without time zone,
  empresa_id uuid,
  CONSTRAINT turnos_pkey PRIMARY KEY (id),
  CONSTRAINT turnos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.user_marine_data (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  company text DEFAULT 'McKeil Marine Limited'::text,
  rut text,
  additional_info jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_marine_data_pkey PRIMARY KEY (id),
  CONSTRAINT user_marine_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_producto_permisos (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid UNIQUE,
  puede_ver_todos boolean DEFAULT false,
  sucursales_ids ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_producto_permisos_pkey PRIMARY KEY (id),
  CONSTRAINT user_producto_permisos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['admin'::character varying, 'gerente'::character varying, 'supervisor'::character varying, 'cajero'::character varying, 'vendedor'::character varying]::text[])),
  sucursal_id uuid,
  creado_en timestamp with time zone DEFAULT now(),
  actualizado_en timestamp with time zone DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_roles_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.user_tenants (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  tenant_name text NOT NULL,
  tenant_type text,
  status text DEFAULT 'active'::text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_tenants_pkey PRIMARY KEY (id),
  CONSTRAINT user_tenants_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  nombre text,
  apellido text,
  rut text UNIQUE,
  telefono text,
  direccion text,
  rol text NOT NULL DEFAULT 'cliente'::text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuario_empresa (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid,
  empresa_id uuid,
  sucursal_id uuid,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  rol text DEFAULT 'empleado'::text,
  proposito text,
  CONSTRAINT usuario_empresa_pkey PRIMARY KEY (id),
  CONSTRAINT usuario_empresa_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT usuario_empresa_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id)
);
CREATE TABLE public.usuario_permisos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL,
  permiso_id uuid NOT NULL,
  otorgado boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT usuario_permisos_pkey PRIMARY KEY (id),
  CONSTRAINT usuario_permisos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT usuario_permisos_permiso_id_fkey FOREIGN KEY (permiso_id) REFERENCES public.permisos(id)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  nombres text NOT NULL,
  apellidos text NOT NULL,
  rut text NOT NULL UNIQUE,
  telefono text,
  direccion text,
  activo boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  fecha_nacimiento date,
  rol text,
  auth_user_id uuid UNIQUE,
  empresa_id uuid,
  password_hash text,
  sucursal_id uuid,
  temp_password text,
  sesion_activa boolean,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_auth_user_id_fkey FOREIGN KEY (auth_user_id) REFERENCES auth.users(id),
  CONSTRAINT usuarios_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id)
);
CREATE TABLE public.venta_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venta_id uuid,
  producto_id uuid,
  cantidad integer NOT NULL DEFAULT 1,
  precio_unitario numeric NOT NULL,
  descuento numeric DEFAULT 0,
  subtotal numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT venta_items_pkey PRIMARY KEY (id),
  CONSTRAINT venta_items_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id),
  CONSTRAINT venta_items_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id)
);
CREATE TABLE public.ventas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  empresa_id uuid,
  sucursal_id uuid,
  caja_id uuid,
  sesiones_caja_id uuid,
  cliente_id uuid,
  usuario_id uuid,
  folio text NOT NULL,
  tipo_dte text NOT NULL CHECK (tipo_dte = ANY (ARRAY['factura'::text, 'boleta'::text, 'nota_credito'::text])),
  metodo_pago text NOT NULL,
  subtotal numeric NOT NULL DEFAULT 0,
  descuento numeric DEFAULT 0,
  impuestos numeric DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  estado text DEFAULT 'completada'::text CHECK (estado = ANY (ARRAY['pendiente'::text, 'completada'::text, 'anulada'::text])),
  fecha timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  tipo_tarjeta text,
  CONSTRAINT ventas_pkey PRIMARY KEY (id),
  CONSTRAINT ventas_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id),
  CONSTRAINT ventas_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id),
  CONSTRAINT ventas_caja_id_fkey FOREIGN KEY (caja_id) REFERENCES public.cajas(id),
  CONSTRAINT ventas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id),
  CONSTRAINT ventas_sesiones_caja_id_fkey FOREIGN KEY (sesiones_caja_id) REFERENCES public.sesiones_caja(id)
);
CREATE TABLE public.ventas_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  venta_id uuid NOT NULL,
  producto_id uuid NOT NULL,
  cantidad numeric NOT NULL CHECK (cantidad > 0::numeric),
  precio_unitario numeric NOT NULL CHECK (precio_unitario >= 0::numeric),
  subtotal numeric NOT NULL CHECK (subtotal >= 0::numeric),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ventas_items_pkey PRIMARY KEY (id),
  CONSTRAINT ventas_items_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id)
);



tablas: 
Database Tables

schema

public


Search for a table

New table
Name	Description	Rows (Estimated)	Size (Estimated)	Realtime Enabled	
aperturas_caja

No description

0	48 kB	
11 columns

archivos

No description

0	24 kB	
9 columns

archivos_adjuntos

No description

0	16 kB	
5 columns

asignaciones_tareas

No description

0	24 kB	
7 columns

asistencias

No description

0	32 kB	
7 columns

auditoria

No description

2	1080 kB	
8 columns

auditoria_inventario

No description

1	2904 kB	
8 columns

borradores_venta

No description

0	48 kB	
8 columns

caf_files

No description

0	48 kB	
16 columns

cajas

No description

0	96 kB	
7 columns

categorias

No description

0	48 kB	
6 columns

categorias_productos

No description

0	16 kB	
5 columns

certificados_digitales

No description

0	24 kB	
8 columns

clientes

No description

0	64 kB	
19 columns

comunicados

No description

0	32 kB	
8 columns

configuracion_pos

No description

0	104 kB	
15 columns

configuracion_sii

No description

0	48 kB	
21 columns

cotizacion_detalle

No description

0	8192 bytes	
7 columns

cotizaciones

No description

0	16 kB	
9 columns

cupones

No description

0	80 kB	
15 columns

demo_registrations

No description

2	104 kB	
22 columns

descuentos

No description

0	48 kB	
11 columns

despachos

No description

0	48 kB	
11 columns

detalles_orden_compra

No description

0	16 kB	
6 columns

devoluciones

No description

0	64 kB	
9 columns

devoluciones_items

No description

0	48 kB	
6 columns

documentos_electronicos

No description

0	24 kB	
25 columns

documentos_tributarios

No description

0	16 kB	
9 columns

dte

No description

0	24 kB	
14 columns

dte_envios

No description

0	16 kB	
6 columns

empresa_id_result

No description

0	0 bytes	
1 columns

empresas

No description

2	80 kB	
14 columns

envios_sii

No description

0	16 kB	
11 columns

error_log

No description

0	16 kB	
5 columns

facturas_pedidos

Tabla donde se guardan las facturas de actualización masiva inventario	0	32 kB	
4 columns

folios

No description

0	16 kB	
8 columns

folios_autorizados

No description

0	48 kB	
10 columns

folios_electronicos

No description

0	80 kB	
9 columns

impuestos

No description

0	16 kB	
5 columns

inventario

No description

2	312 kB	
11 columns

invitaciones_pendientes

No description

2	96 kB	
13 columns

login_methods

No description

0	8192 bytes	
6 columns

medios_pago

No description

0	32 kB	
6 columns

mermas

No description

0	32 kB	
8 columns

metodos_pago

No description

0	24 kB	
7 columns

migration_logs

No description

4	72 kB	
6 columns

movimientos

No description

0	64 kB	
6 columns

movimientos_caja

No description

0	32 kB	
11 columns

notificaciones

No description

3	128 kB	
13 columns

orden_compra_detalle

No description

0	8192 bytes	
6 columns

orden_detalle

No description

0	8192 bytes	
6 columns

ordenes

No description

0	24 kB	
8 columns

ordenes_compra

No description

0	16 kB	
8 columns

pagos

No description

0	16 kB	
7 columns

parametros_empresa

No description

0	16 kB	
5 columns

payment_providers

No description

0	32 kB	
8 columns

pedidos

No description

0	112 kB	
20 columns

permisos

No description

0	48 kB	
6 columns

planes

No description

1	24 kB	
14 columns

pos_sync_log

No description

0	752 kB	
10 columns

pos_terminals

No description

0	48 kB	
12 columns

pos_transactions

No description

0	64 kB	
13 columns

productos

No description

1	192 kB	
17 columns

profiles

No description

0	24 kB	
7 columns

promociones

No description

0	104 kB	
13 columns

proveedores

No description

0	24 kB	
11 columns

resumen_inventario

No description

-	-	
5 columns

roles

No description

0	32 kB	
4 columns

roles_permisos

No description

0	16 kB	
6 columns

sesiones_caja

No description

1	192 kB	
18 columns

solicitudes

No description

0	16 kB	
6 columns

solicitudes_vacaciones

No description

0	48 kB	
9 columns

sucursales

No description

2	32 kB	
11 columns

system_config

No description

0	16 kB	
4 columns

tareas

No description

0	32 kB	
7 columns

terminal_sessions

No description

0	48 kB	
10 columns

turnos

No description

0	8192 bytes	
7 columns

user_marine_data

No description

0	16 kB	
6 columns

user_producto_permisos

No description

0	24 kB	
5 columns

user_roles

No description

0	72 kB	
6 columns

user_tenants

No description

0	32 kB	
7 columns

users

No description

0	32 kB	
12 columns

usuario_empresa

No description

2	112 kB	
8 columns

usuario_permisos

No description

0	40 kB	
5 columns

usuarios

No description

2	160 kB	
18 columns

venta_items

No description

0	56 kB	
8 columns

ventas

No description

0	128 kB	
19 columns

ventas_items

No description

0	32 kB	
8 columns

vw_estado_cajas

No description

-	-	
17 columns

vw_resumen_sucursales

No description

-	-	
9 columns

vw_ventas_detalle

No description

-	-	
17 columns



FUNCTIONS: 

Database Functions
Docs

schema

public

Search for a function

Return Type

Security

Create a new function

Name	Arguments	Return type	Security	

abrir_caja
p_caja_id uuid, p_usuario_id uuid, p_monto_inicial numeric

uuid

Definer



abrir_sesion_caja
p_caja_id uuid, p_usuario_id uuid, p_saldo_inicial numeric

uuid

Definer



actualizar_metadata_usuario
p_user_id uuid, p_nombres text DEFAULT NULL::text, p_apellidos text DEFAULT NULL::text, p_rut text DEFAULT NULL::text, p_email text DEFAULT NULL::text

void

Definer



actualizar_metadata_usuario
p_user_id uuid, p_nombre_completo text DEFAULT NULL::text, p_rut text DEFAULT NULL::text, p_telefono text DEFAULT NULL::text

void

Definer



actualizar_timestamp
-

trigger	
Definer



alertas_stock_bajo
-

TABLE(producto_id uuid, nombre text, stock_actual numeric, stock_minimo numeric, porcentaje_stock numeric)

Definer



asignar_permisos_productos
p_user_id uuid, p_puede_ver_todos boolean DEFAULT false, p_sucursales_ids bigint[] DEFAULT NULL::bigint[]

void

Definer



asignar_rol_usuario
p_user_id uuid, p_role text, p_sucursal_id uuid DEFAULT NULL::uuid

void

Definer



asignar_rol_usuario
p_user_id uuid, p_role text, p_sucursal_id bigint DEFAULT NULL::bigint

void

Definer



audit_cash_movements
apertura_id uuid

TABLE(tipo text, monto numeric, observacion text, fecha timestamp with time zone, usuario_nombre text)

Definer



auditar_cambios_producto
-

trigger	
Definer



authenticate_usuario
p_rut text, p_password text

TABLE(id uuid, email text, nombres text, apellidos text, rut text, activo boolean, auth_user_id uuid)

Definer



auto_migrate_demo_user
-

trigger	
Invoker



auto_prepare_demo_migration
-

trigger	
Invoker



calculate_vuelto
monto_recibido numeric, total_venta numeric

numeric

Definer



cerrar_caja
p_apertura_caja_id uuid, p_usuario_id uuid, p_monto_final numeric

boolean

Definer



cerrar_caja
p_sesion_id uuid, p_usuario_id uuid, p_saldo_final numeric, p_observaciones text DEFAULT NULL::text

void

Definer



cerrar_sesion_caja
p_sesion_id uuid, p_usuario_id uuid, p_saldo_final numeric, p_observaciones text DEFAULT NULL::text

boolean

Definer



check_table_exists
table_name_param text

boolean

Definer



column_exists
schema_name text, table_name text, column_name text

boolean

Invoker



crear_orden_compra
p_proveedor_id uuid, p_productos uuid[], p_cantidades numeric[], p_precios numeric[]

uuid

Definer



crear_usuario_con_password
p_nombres text, p_apellidos text, p_rut text, p_email text, p_telefono text, p_direccion text, p_fecha_nacimiento date DEFAULT NULL::date, p_password text DEFAULT ''::text, p_empresa_id uuid DEFAULT NULL::uuid, p_sucursal_id uuid DEFAULT NULL::uuid, p_rol text DEFAULT 'empleado'::text

void

Definer



create_despachos_table
-

void

Invoker



create_empresa_from_demo
demo_id uuid

uuid

Invoker



create_user_with_auth
user_email text, user_password text, user_nombres text, user_apellidos text, user_rut text, user_telefono text DEFAULT NULL::text, user_direccion text DEFAULT NULL::text, user_fecha_nacimiento date DEFAULT NULL::date, user_rol text DEFAULT 'empleado'::text, empresa_id_param uuid DEFAULT NULL::uuid

json

Definer



create_user_with_auth
user_email text, user_password text, user_nombres text, user_apellidos text, user_rut text, user_telefono text DEFAULT NULL::text, user_direccion text DEFAULT NULL::text, user_fecha_nacimiento date DEFAULT NULL::date, user_rol text DEFAULT 'empleado'::text, empresa_id_param uuid DEFAULT NULL::uuid, sucursal_id_param uuid DEFAULT NULL::uuid

json

Definer



delete_cliente
p_id uuid

jsonb

Invoker



descontar_merma
-

trigger	
Invoker



diagnosticar_permisos_usuario
p_usuario_id uuid

TABLE(permiso text, tiene_permiso boolean, detalles jsonb)

Definer



emitir_dte
_venta uuid

jsonb

Definer



enviar_dte_sii
p_documento_id uuid

boolean

Definer



evaluar_proveedor
p_proveedor_id uuid, p_calificacion numeric

void

Definer



f_empresas_usuario
-

TABLE(empresa_id uuid, sucursal_id uuid)

Definer



f_rol_actual
-

text

Invoker



fn_audit_generic
-

trigger	
Invoker



generar_xml_dte
p_venta_id uuid

text

Definer



get_cajas_permisos
p_user_id uuid

jsonb

Definer



get_cash_audit
apertura_id uuid

TABLE(monto_inicial numeric, ventas_efectivo numeric, ventas_tarjeta numeric, ingresos numeric, retiros numeric, monto_teorico numeric, monto_final numeric, diferencia numeric)

Definer



get_clientes
p_search text, p_limit integer, p_offset integer, p_order_by text

TABLE(id uuid, tipo_cliente text, cliente_extranjero boolean, rut text, razon_social text, giro text, nombres text, apellidos text, direccion text, comuna text, ciudad text)

Invoker



get_clientes
p_search text, p_rut text, p_giro text, p_ciudad text, p_limit integer, p_offset integer, p_order_by text

TABLE(id uuid, tipo_cliente text, cliente_extranjero boolean, rut text, razon_social text, giro text, nombres text, apellidos text, direccion text, comuna text, ciudad text)

Invoker



get_error_response
p_error_code text, p_error_message text

jsonb

Invoker



get_monthly_sales_comparison
empresa_id_arg uuid, fecha_inicio date, fecha_fin date

TABLE(mes text, actual numeric, anterior numeric)

Invoker



get_next_folio
p_terminal_id uuid

integer

Invoker



get_sesion_activa
p_user_id uuid

json

Definer



get_sesion_activa
-

TABLE(id uuid, caja_id uuid, usuario_id uuid, sucursal_id uuid, estado text, saldo_inicial numeric, abierta_en timestamp with time zone)

Definer



get_user_data
p_user_id uuid

jsonb

Definer



get_user_data
-

TABLE(user_id uuid, email text, nombre text, roles jsonb)

Definer



get_user_empresa_id
-

uuid

Definer



get_user_profile
p_auth_user_id uuid

TABLE(user_id uuid, email text, nombres text, apellidos text, empresa_id uuid, empresa_nombre text)

Definer



get_ventas_con_items_disponibles
p_empresa_id uuid, p_sucursal_id uuid DEFAULT NULL::uuid

TABLE(id uuid, empresa_id uuid, sucursal_id uuid, caja_id uuid, sesiones_caja_id uuid, cliente_id uuid, usuario_id uuid, folio text, tipo_dte text, metodo_pago text, subtotal numeric, descuento numeric, impuestos numeric, total numeric, estado text, fecha timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, tipo_tarjeta text)

Invoker



handle_new_user
-

trigger	
Definer



insertar_movimiento_stock
-

trigger	
Invoker



invalidate_user_sessions
target_user_id uuid

void

Definer



migrate_demo_user_to_backoffice
demo_id uuid

json

Invoker



movimientos_producto
p_producto_id uuid, p_fecha_inicio timestamp without time zone DEFAULT (now() - '90 days'::interval), p_fecha_fin timestamp without time zone DEFAULT now()

TABLE(producto_id uuid, nombre text, tipo_movimiento text, cantidad numeric, fecha timestamp without time zone, usuario text)

Definer



next_folio
_tipo text, _emp uuid

integer

Invoker



normalize_rut
rut text

text

Invoker



notificar_apertura_caja
-

trigger	
Invoker



notificar_cierre_caja
-

trigger	
Invoker



notificar_movimiento_efectivo
-

trigger	
Invoker



notificar_nueva_merma
-

trigger	
Invoker



obtener_proximo_folio
p_empresa_id uuid, p_tipo_documento integer

integer

Definer



obtener_sucursal_usuario
-

uuid

Definer



prepare_demo_migration
demo_id uuid

json

Invoker



procesar_devolucion
p_venta_id uuid, p_usuario_id uuid, p_items_devolucion jsonb, p_motivo text

uuid

Definer



register_sale
p_empresa_id uuid, p_sucursal_id uuid, p_caja_id uuid, p_apertura_caja_id uuid, p_cliente_id uuid, p_usuario_id uuid, p_tipo_dte text, p_metodo_pago text, p_items jsonb, p_total numeric

uuid

Definer



registrar_entrada_producto
p_producto_uuid uuid, p_cantidad integer

void

Definer



registrar_proveedor
p_nombre text, p_contacto text DEFAULT NULL::text, p_email text DEFAULT NULL::text, p_telefono text DEFAULT NULL::text, p_direccion text DEFAULT NULL::text, p_nit_ruc text DEFAULT NULL::text

uuid

Definer



registrar_salida_producto
p_producto_uuid uuid, p_cantidad integer

boolean

Definer



registrar_venta_completa
p_empresa_id uuid, p_sucursal_id uuid, p_caja_id uuid, p_usuario_id uuid, p_cliente_id uuid DEFAULT NULL::uuid, p_tipo_documento text DEFAULT 'boleta'::text, p_metodo_pago text DEFAULT 'efectivo'::text, p_items jsonb DEFAULT '[]'::jsonb, p_descuento_global numeric DEFAULT 0, p_observaciones text DEFAULT NULL::text

TABLE(venta_id uuid, folio text, total_venta numeric)

Definer



reporte_inventario_general
-

TABLE(producto_id uuid, nombre text, stock_actual numeric, stock_minimo numeric, valor_total numeric, movimientos_ultimos_30_dias bigint)

Definer



reporte_ordenes_proveedor
p_proveedor_id uuid DEFAULT NULL::uuid, p_fecha_inicio timestamp without time zone DEFAULT (now() - '1 year'::interval), p_fecha_fin timestamp without time zone DEFAULT now()

TABLE(proveedor_nombre text, total_ordenes bigint, monto_total numeric, promedio_orden numeric, estado_predominante text)

Definer



safe_uuid
input_uuid text

uuid

Invoker



sync_demo_to_empresa
-

void

Invoker



sync_user_data
-

trigger	
Definer



table_exists
schema_name text, table_name text

boolean

Invoker



tiene_permiso_en_sucursal
usuario_id uuid, sucursal_id_param uuid

boolean

Definer



tiene_rol
usuario_id uuid, rol_buscado text

boolean

Definer



trg_descontar_stock
-

trigger	
Invoker



trg_mc_set_empresa
-

trigger	
Invoker



trg_mc_set_sucursal
-

trigger	
Invoker



trg_merma_stock
-

trigger	
Invoker



trg_ventas_set_empresa
-

trigger	
Invoker



update_cliente
p_id uuid, p_tipo_cliente text, p_cliente_extranjero boolean, p_rut text, p_razon_social text, p_giro text, p_nombres text, p_apellidos text, p_direccion text, p_comuna text, p_ciudad text

jsonb

Invoker



update_modified_column
-

trigger	
Invoker



update_stock_after_return_fn
-

trigger	
Invoker



update_stock_after_sale_fn
-

trigger	
Invoker



update_stock_safely
producto_id_param uuid, cantidad_param integer

boolean

Definer



update_user_rut
user_id uuid, new_rut text

boolean

Definer



validate_cliente_data
p_tipo_cliente text, p_cliente_extranjero boolean, p_rut text, p_razon_social text, p_giro text, p_nombres text, p_apellidos text, p_direccion text, p_comuna text, p_ciudad text

boolean

Invoker



validate_positive_number
input_number numeric

numeric

Definer



validate_stock_negative
-

trigger	
Invoker



validate_user_by_rut
p_rut text, p_password text

TABLE(id uuid, email text, nombre text, apellidos text, rut text, rol text, empresa_id uuid, sucursal_id uuid)

Definer



validate_venta_items
p_items jsonb

TABLE(is_valid boolean, error_message text)

Invoker



ventas_por_mes
empresa_id_arg uuid, fecha_inicio date, fecha_fin date

TABLE(mes text, actual numeric, anterior numeric)

Definer



ventas_por_mes
empresa_id_arg uuid, fecha_inicio date, fecha_fin date, cajas_id uuid[] DEFAULT NULL::uuid[]

TABLE(mes text, actual numeric, anterior numeric)

Definer



ventas_por_metodo_pago
empresa_id_arg uuid, fecha_inicio date, fecha_fin date

TABLE(metodo_pago text, total numeric, porcentaje numeric)

Definer



ventas_por_producto
empresa_id_arg uuid, fecha_inicio date, fecha_fin date

TABLE(producto_id uuid, nombre text, cantidad bigint, total numeric)

Definer


TRIGGERS:

Database Triggers
Execute a set of actions automatically on specified table events
Docs

schema

public

Search for a trigger

New trigger

Name	Table	Function	Events	Orientation	Enabled	
actualizar_sesiones_caja_timestamp	
sesiones_caja

actualizar_timestamp

BEFORE UPDATE
ROW


actualizar_sucursales_timestamp	
sucursales

actualizar_timestamp

BEFORE UPDATE
ROW


actualizar_user_roles_timestamp	
user_roles

actualizar_timestamp

BEFORE UPDATE
ROW


sync_usuarios_to_auth	
usuarios

sync_user_data

AFTER UPDATE
ROW


tr_insertar_movimiento_stock	
productos

insertar_movimiento_stock

AFTER UPDATE
AFTER INSERT
ROW


trg_audit_asistencias	
asistencias

fn_audit_generic

AFTER UPDATE
AFTER DELETE
AFTER INSERT
ROW


trg_audit_inventario	
inventario

fn_audit_generic

AFTER UPDATE
AFTER DELETE
AFTER INSERT
ROW


trg_merma_after_insert	
mermas

descontar_merma

AFTER INSERT
ROW


trigger_auditar_productos	
productos

auditar_cambios_producto

AFTER DELETE
AFTER UPDATE
AFTER INSERT
ROW


trigger_auto_migrate_demo	
demo_registrations

auto_migrate_demo_user

AFTER UPDATE
ROW


trigger_auto_migrate_demo_user	
demo_registrations

auto_migrate_demo_user

AFTER UPDATE
ROW


trigger_auto_prepare_demo_migration	
demo_registrations

auto_prepare_demo_migration

AFTER UPDATE
ROW


trigger_insertar_movimiento	
productos

insertar_movimiento_stock

AFTER INSERT
ROW


trigger_notificar_apertura_caja	
sesiones_caja

notificar_apertura_caja

AFTER INSERT
AFTER UPDATE
ROW


trigger_notificar_cierre_caja	
sesiones_caja

notificar_cierre_caja

AFTER INSERT
AFTER UPDATE
ROW


trigger_notificar_movimiento_efectivo	
movimientos_caja

notificar_movimiento_efectivo

AFTER INSERT
ROW


trigger_notificar_nueva_merma	
mermas

notificar_nueva_merma

AFTER INSERT
ROW


update_stock_after_sale	
venta_items

update_stock_after_sale_fn

AFTER INSERT
ROW


update_usuarios_modtime	
usuarios

update_modified_column

BEFORE UPDATE
ROW


Indexes:

Database Indexes
Improve query performance against your database
Docs
Index Advisor

schema

public

Search for an index

Create index
Schema	Table	Name	
public

aperturas_caja

aperturas_caja_pkey


View definition

public

archivos_adjuntos

archivos_adjuntos_pkey


View definition

public

archivos

archivos_bucket_path_key


View definition

public

archivos

archivos_pkey


View definition

public

asignaciones_tareas

asignaciones_tareas_pkey


View definition

public

asistencias

asistencias_pkey


View definition

public

asistencias

asistencias_usuario_id_fecha_key


View definition

public

auditoria_inventario

auditoria_inventario_pkey


View definition

public

auditoria

auditoria_pkey


View definition

public

borradores_venta

borradores_venta_pkey


View definition

public

caf_files

caf_files_pkey


View definition

public

cajas

cajas_pkey


View definition

public

categorias

categorias_pkey


View definition

public

categorias_productos

categorias_productos_pkey


View definition

public

certificados_digitales

certificados_digitales_empresa_id_nombre_key


View definition

public

certificados_digitales

certificados_digitales_pkey


View definition

public

clientes

clientes_pkey


View definition

public

comunicados

comunicados_pkey


View definition

public

configuracion_pos

configuracion_pos_pkey


View definition

public

configuracion_pos

configuracion_pos_unique


View definition

public

configuracion_sii

configuracion_sii_empresa_id_key


View definition

public

configuracion_sii

configuracion_sii_pkey


View definition

public

cotizacion_detalle

cotizacion_detalle_pkey


View definition

public

cotizaciones

cotizaciones_pkey


View definition

public

cupones

cupones_codigo_key


View definition

public

cupones

cupones_pkey


View definition

public

demo_registrations

demo_registrations_pkey


View definition

public

descuentos

descuentos_pkey


View definition

public

despachos

despachos_pkey


View definition

public

detalles_orden_compra

detalles_orden_compra_pkey


View definition

public

devoluciones_items

devoluciones_items_pkey


View definition

public

devoluciones

devoluciones_pkey


View definition

public

documentos_electronicos

documentos_electronicos_empresa_id_tipo_documento_folio_key


View definition

public

documentos_electronicos

documentos_electronicos_pkey


View definition

public

documentos_tributarios

documentos_tributarios_pkey


View definition

public

dte_envios

dte_envios_pkey


View definition

public

dte

dte_pkey


View definition

public

empresas

empresas_pkey


View definition

public

empresas

empresas_rut_key


View definition

public

envios_sii

envios_sii_pkey


View definition

public

error_log

error_log_pkey


View definition

public

facturas_pedidos

facturas_pedidos_pkey


View definition

public

folios_autorizados

folios_autorizados_empresa_id_tipo_documento_folio_desde_fo_key


View definition

public

folios_autorizados

folios_autorizados_pkey


View definition

public

folios_electronicos

folios_electronicos_caf_id_folio_key


View definition

public

folios_electronicos

folios_electronicos_pkey


View definition

public

folios

folios_pkey


View definition

public

aperturas_caja

idx_aperturas_caja_estado


View definition

public

asistencias

idx_asist_usr_fecha


View definition

public

asistencias

idx_asistencias_usuario_id


View definition

public

auditoria_inventario

idx_auditoria_fecha


View definition

public

auditoria_inventario

idx_auditoria_tabla


View definition

public

borradores_venta

idx_borradores_venta_empresa_usuario


View definition

public

caf_files

idx_caf_files_empresa_id


View definition

public

cajas

idx_cajas_activo


View definition

public

cajas

idx_cajas_empresa_id


View definition

public

cajas

idx_cajas_sucursal


View definition

public

cajas

idx_cajas_sucursal_id


View definition

public

categorias

idx_categorias_empresa_id


View definition

public

clientes

idx_clientes_empresa_id


View definition

public

clientes

idx_clientes_empresa_rut


View definition

public

configuracion_pos

idx_configuracion_pos_empresa_id


View definition

public

cupones

idx_cupones_codigo


View definition

public

cupones

idx_cupones_empresa_id


View definition

public

descuentos

idx_descuentos_empresa_id


View definition

public

despachos

idx_despachos_empresa_cliente


View definition

public

devoluciones

idx_devoluciones_empresa_id


View definition

public

devoluciones_items

idx_devoluciones_items_devolucion_id


View definition

public

devoluciones

idx_devoluciones_venta_id


View definition

public

dte

idx_dte_folio_tipo


View definition

public

folios_electronicos

idx_folios_electronicos_caf_id


View definition

public

folios_electronicos

idx_folios_electronicos_usado


View definition

public

inventario

idx_inv_prod_suc


View definition

public

inventario

idx_inventario_empresa_id


View definition

public

inventario

idx_inventario_producto_id


View definition

public

inventario

idx_inventario_sucursal_id


View definition

public

invitaciones_pendientes

idx_invitaciones_email


View definition

public

invitaciones_pendientes

idx_invitaciones_expires


View definition

public

invitaciones_pendientes

idx_invitaciones_token


View definition

public

movimientos

idx_movimientos_fecha


View definition

public

movimientos

idx_movimientos_producto


View definition

public

ordenes

idx_ordenes_cliente_id


View definition

public

pedidos

idx_pedidos_folio


View definition

public

pedidos

idx_pedidos_razon_social


View definition

public

pedidos

idx_pedidos_sucursal_id


View definition

public

pos_sync_log

idx_pos_sync_log_terminal_id


View definition

public

pos_transactions

idx_pos_transactions_status


View definition

public

pos_transactions

idx_pos_transactions_terminal_id


View definition

public

productos

idx_productos_activo


View definition

public

productos

idx_productos_codigo


View definition

public

productos

idx_productos_empresa_activo


View definition

public

productos

idx_productos_empresa_id


View definition

public

productos

idx_productos_nombre


View definition

public

productos

idx_productos_stock


View definition

public

productos

idx_productos_tipo


View definition

public

promociones

idx_promociones_disponible


View definition

public

promociones

idx_promociones_precio_prom


View definition

public

sesiones_caja

idx_sesiones_caja_abierta


View definition

public

sesiones_caja

idx_sesiones_caja_caja


View definition

public

sesiones_caja

idx_sesiones_caja_cerrada


View definition

public

sesiones_caja

idx_sesiones_caja_estado


View definition

public

sesiones_caja

idx_sesiones_caja_sucursal


View definition

public

sesiones_caja

idx_sesiones_caja_usuario


View definition

public

solicitudes_vacaciones

idx_solicitudes_vacaciones_usuario_id


View definition

public

terminal_sessions

idx_terminal_sessions_terminal_id


View definition

public

user_roles

idx_user_roles_sucursal


View definition

public

user_roles

idx_user_roles_user


View definition

public

usuario_empresa

idx_usuario_empresa_activo


View definition

public

usuario_empresa

idx_usuario_empresa_usuario_id


View definition

public

usuarios

idx_usuarios_auth_user_id


View definition

public

ventas

idx_ventas_empresa_fecha


View definition

public

ventas

idx_ventas_empresa_id


View definition

public

ventas

idx_ventas_folio


View definition

public

ventas_items

idx_ventas_items_producto_id


View definition

public

ventas_items

idx_ventas_items_venta_id


View definition

public

ventas

idx_ventas_sucursal_id


View definition

public

impuestos

impuestos_pkey


View definition

public

inventario

inventario_pkey


View definition

public

invitaciones_pendientes

invitaciones_pendientes_pkey


View definition

public

invitaciones_pendientes

invitaciones_pendientes_token_key


View definition

public

login_methods

login_methods_pkey


View definition

public

medios_pago

medios_pago_pkey


View definition

public

mermas

mermas_pkey


View definition

public

metodos_pago

metodos_pago_pkey


View definition

public

migration_logs

migration_logs_pkey


View definition

public

movimientos_caja

movimientos_caja_pkey


View definition

public

movimientos

movimientos_pkey


View definition

public

notificaciones

notificaciones_pkey


View definition

public

orden_compra_detalle

orden_compra_detalle_pkey


View definition

public

orden_detalle

orden_detalle_pkey


View definition

public

ordenes_compra

ordenes_compra_pkey


View definition

public

ordenes

ordenes_pkey


View definition

public

pagos

pagos_pkey


View definition

public

parametros_empresa

parametros_empresa_pkey


View definition

public

payment_providers

payment_providers_pkey


View definition

public

pedidos

pedidos_pkey


View definition

public

permisos

permisos_nombre_key


View definition

public

permisos

permisos_pkey


View definition

public

planes

planes_pkey


View definition

public

pos_sync_log

pos_sync_log_pkey


View definition

public

pos_terminals

pos_terminals_pkey


View definition

public

pos_terminals

pos_terminals_terminal_code_key


View definition

public

pos_transactions

pos_transactions_pkey


View definition

public

productos

productos_empresa_sucursal_codigo_unique


View definition

public

productos

productos_pkey


View definition

public

profiles

profiles_email_key


View definition

public

profiles

profiles_pkey


View definition

public

promociones

promociones_pkey


View definition

public

proveedores

proveedores_pkey


View definition

public

proveedores

proveedores_rut_key


View definition

public

roles_permisos

roles_permisos_pkey


View definition

public

roles

roles_pkey


View definition

public

sesiones_caja

sesiones_caja_pkey


View definition

public

solicitudes

solicitudes_pkey


View definition

public

solicitudes_vacaciones

solicitudes_vacaciones_pkey


View definition

public

sucursales

sucursales_pkey


View definition

public

system_config

system_config_pkey


View definition

public

tareas

tareas_pkey


View definition

public

terminal_sessions

terminal_sessions_pkey


View definition

public

turnos

turnos_pkey


View definition

public

configuracion_pos

unique_config_per_caja


View definition

public

demo_registrations

unique_email


View definition

public

demo_registrations

unique_rut


View definition

public

user_roles

unique_user_role_sucursal


View definition

public

user_marine_data

user_marine_data_pkey


View definition

public

user_producto_permisos

user_producto_permisos_pkey


View definition

public

user_producto_permisos

user_producto_permisos_user_id_key


View definition

public

user_roles

user_roles_pkey


View definition

public

user_tenants

user_tenants_pkey


View definition

public

users

users_email_key


View definition

public

users

users_pkey


View definition

public

users

users_rut_key


View definition

public

usuario_empresa

usuario_empresa_pkey


View definition

public

usuario_empresa

usuario_empresa_usuario_id_empresa_id_sucursal_id_key


View definition

public

usuario_permisos

usuario_permisos_pkey


View definition

public

usuario_permisos

usuario_permisos_usuario_id_permiso_id_key


View definition

public

usuarios

usuarios_auth_user_id_key


View definition

public

usuarios

usuarios_email_key


View definition

public

usuarios

usuarios_pkey


View definition

public

usuarios

usuarios_rut_key


View definition

public

venta_items

venta_items_pkey


View definition

public

ventas

ventas_empresa_id_folio_key


View definition

public

ventas_items

ventas_items_pkey


View definition

public

ventas

ventas_pkey


View definition






Database Publications
Search for a publication
Name	System ID	Insert	Update	Delete	Truncate	
supabase_realtime
16426	



2 tables
supabase_realtime_messages_publication
109543	



POLITICAS RLS:
Policies
Manage Row Level Security policies for your tables

Docs
Filter tables and policies

schema

public

aperturas_caja

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for aperturas_caja
ALL	
public

archivos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for archivos
ALL	
public

archivos_adjuntos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for archivos_adjuntos
ALL	
public

asignaciones_tareas

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage asignaciones_tareas
ALL	
authenticated

asistencias

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for asistencias
ALL	
public


asist_insert
INSERT	
public


Users can manage asistencias
ALL	
authenticated


Users can read asistencias
SELECT	
authenticated

auditoria
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for auditoria
ALL	
public

auditoria_inventario
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

borradores_venta

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for borradores_venta
ALL	
public

caf_files

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage caf_files
ALL	
authenticated


Users can read caf_files
SELECT	
authenticated

cajas

Disable RLS

Create policy

Name	Command	Applied to	Actions

Admins and managers can update cajas
UPDATE	
public


Permitir gestión completa a administradores
ALL	
authenticated


Permitir ver cajas activas
SELECT	
authenticated


Users can manage cajas
ALL	
authenticated


Users can manage own company cajas
ALL	
authenticated


Users can read cajas
SELECT	
authenticated


View active cajas for user's branches
SELECT	
public

categorias

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for categorias
ALL	
public


Users can manage categorias
ALL	
authenticated


Users can read categorias
SELECT	
authenticated

categorias_productos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

certificados_digitales

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for certificados_digitales
ALL	
public

clientes

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for clientes
ALL	
public


Users can manage clientes
ALL	
authenticated


Users can read clientes
SELECT	
authenticated

comunicados

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for comunicados
ALL	
public


Enable all for authenticated users
ALL	
authenticated

configuracion_pos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage configuracion_pos
ALL	
authenticated

configuracion_sii

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for configuracion_sii
ALL	
public

cotizacion_detalle
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for cotizacion_detalle
ALL	
public

cotizaciones
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for cotizaciones
ALL	
public

cupones

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage cupones
ALL	
authenticated

demo_registrations
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for demo_registrations
ALL	
public

descuentos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage descuentos
ALL	
authenticated

despachos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for despachos
ALL	
public


Enable all for authenticated users
ALL	
authenticated

detalles_orden_compra

Disable RLS

Create policy

Name	Command	Applied to	Actions

Empleados ven detalles de órdenes
SELECT	
authenticated

devoluciones
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for devoluciones
ALL	
public

devoluciones_items
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

documentos_electronicos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for documentos_electronicos
ALL	
public

documentos_tributarios

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for documentos_tributarios
ALL	
public

dte
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for dte
ALL	
public

dte_envios
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for dte_envios
ALL	
public

empresa_id_result
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

empresas

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for empresas
ALL	
public


Allow all operations on empresas
ALL	
public


Users can read empresas
SELECT	
authenticated

envios_sii

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for envios_sii
ALL	
public

error_log
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

facturas_pedidos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

folios
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for folios
ALL	
public

folios_autorizados

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for folios_autorizados
ALL	
public

folios_electronicos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage folios_electronicos
ALL	
authenticated


Users can read folios_electronicos
SELECT	
authenticated

impuestos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for impuestos
ALL	
public

inventario
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

inventario_select
SELECT	
public


Users can manage inventario
ALL	
authenticated


Users can manage own company inventario
ALL	
authenticated

invitaciones_pendientes
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Users can manage invitaciones_pendientes
ALL	
authenticated

login_methods

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage own login methods
ALL	
public

medios_pago

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for medios_pago
ALL	
public

mermas
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for mermas
ALL	
public

metodos_pago

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow authenticated users to read metodos_pago
ALL	
authenticated


Users can manage metodos_pago
ALL	
authenticated


Users can read metodos_pago
SELECT	
authenticated

migration_logs
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

movimientos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Empleados ven sus propios movimientos
SELECT	
authenticated


Usuarios autenticados pueden insertar movimientos
INSERT	
public


Usuarios ven solo sus movimientos
SELECT	
public

movimientos_caja

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage own company movimientos_caja
ALL	
authenticated

notificaciones
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Users can manage own company notificaciones
ALL	
authenticated

orden_compra_detalle
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for orden_compra_detalle
ALL	
public

orden_detalle
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for orden_detalle
ALL	
public

ordenes
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for ordenes
ALL	
public

ordenes_compra

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for ordenes_compra
ALL	
public


Empleados ven órdenes de compra
SELECT	
authenticated


Solo administradores crean/modifican órdenes
ALL	
authenticated

pagos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for pagos
ALL	
public

parametros_empresa
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for parametros_empresa
ALL	
public

payment_providers

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage payment_providers
ALL	
authenticated


Users can read payment_providers
SELECT	
authenticated

pedidos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage own company pedidos
ALL	
authenticated

permisos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

planes

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage planes
ALL	
authenticated


Users can read planes
SELECT	
authenticated

pos_sync_log

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage pos_sync_log
ALL	
authenticated


Users can read pos_sync_log
SELECT	
authenticated

pos_terminals

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage pos_terminals
ALL	
authenticated


Users can read pos_terminals
SELECT	
authenticated

pos_transactions

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage pos_transactions
ALL	
authenticated


Users can read pos_transactions
SELECT	
authenticated

productos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow authenticated users to read productos
ALL	
authenticated


Users can read productos
SELECT	
authenticated

profiles

Disable RLS

Create policy

Name	Command	Applied to	Actions

Prevent deletion of profiles
DELETE	
public


Users can update own profile
UPDATE	
public


Users can view own profile
SELECT	
public

promociones

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage own company promociones
ALL	
authenticated

proveedores

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for proveedores
ALL	
public


Empleados pueden ver proveedores
SELECT	
authenticated


Solo administradores modifican proveedores
ALL	
authenticated

roles
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for roles
ALL	
public

roles_permisos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for roles_permisos
ALL	
public

sesiones_caja
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Permitir actualizar sesiones propias
UPDATE	
authenticated


Permitir insertar sesiones propias
INSERT	
authenticated


Permitir ver sesiones propias
SELECT	
authenticated


Permitir ver todas las sesiones a administradores
SELECT	
authenticated


Users can create their own sessions
INSERT	
public


Users can delete their open sessions
DELETE	
public


Users can update their open sessions
UPDATE	
public


Users can view their own sessions
SELECT	
public

solicitudes
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for solicitudes
ALL	
public

solicitudes_vacaciones

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage solicitudes_vacaciones
ALL	
authenticated

sucursales

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all operations on sucursales
ALL	
public


Allow authenticated users to read sucursales
ALL	
authenticated


Users can read sucursales
SELECT	
authenticated

system_config
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

tareas

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage tareas
ALL	
authenticated

terminal_sessions

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can manage terminal_sessions
ALL	
authenticated


Users can read terminal_sessions
SELECT	
authenticated

turnos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for turnos
ALL	
public

user_marine_data

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can insert own marine data
INSERT	
public


Users can update own marine data
UPDATE	
public


Users can view own marine data
SELECT	
public


Users cannot delete marine data
DELETE	
public

user_producto_permisos

Disable RLS

Create policy

Name	Command	Applied to	Actions

Usuarios ven solo sus permisos
SELECT	
public

user_roles
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Admins can delete user roles
DELETE	
public


Admins can manage user roles
ALL	
public


Admins can update user roles
UPDATE	
public


Permitir gestión de roles a administradores
ALL	
public


Permitir ver roles propios
SELECT	
authenticated


Permitir ver todos los roles a administradores
SELECT	
authenticated


Usuarios ven solo sus roles
SELECT	
public

user_tenants

Disable RLS

Create policy

Name	Command	Applied to	Actions

Users can create own tenants
INSERT	
public


Users can update own tenants
UPDATE	
public


Users can view own tenants
SELECT	
public

users
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Allow all for users
ALL	
public

usuario_empresa

Disable RLS

Create policy

Name	Command	Applied to	Actions

Allow all for usuario_empresa
ALL	
public

usuario_permisos
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

usuarios
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet

venta_items
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Users can manage own company venta_items
ALL	
authenticated

ventas
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
Name	Command	Applied to	Actions

Users can manage own company ventas
ALL	
authenticated

ventas_items
RLS Disabled

Enable RLS

Create policy

Anyone with your project's anonymous key can read, modify, or delete your data.
No policies created yet