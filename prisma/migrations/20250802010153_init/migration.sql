-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "token" TEXT,
    "password" TEXT NOT NULL,
    "confirmado" BOOLEAN,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Propiedad" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "descripcion" TEXT NOT NULL,
    "habitaciones" INTEGER NOT NULL,
    "estacionamiento" INTEGER NOT NULL,
    "wc" INTEGER NOT NULL,
    "calle" VARCHAR(60) NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "precioId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "nombre" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "Precio" (
    "nombre" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_precioId_key" ON "Propiedad"("precioId");

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_categoriaId_key" ON "Propiedad"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Precio_nombre_key" ON "Precio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sid_key" ON "sessions"("sid");

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_precioId_fkey" FOREIGN KEY ("precioId") REFERENCES "Precio"("nombre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("nombre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Propiedad" ADD CONSTRAINT "Propiedad_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
