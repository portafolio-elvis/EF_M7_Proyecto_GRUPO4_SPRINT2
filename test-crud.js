import sequelize from './config/sequelize.js'
import { Usuario, Tablero, Lista, Tarjeta } from './models/index.js'

async function testCRUD() {

  try {

    /* =========================
       CONEXIÓN
    ========================= */

    console.log("\nCONECTANDO A LA BASE DE DATOS")
    await sequelize.authenticate()
    console.log("Conexion exitosa")


    /* =========================
       CREAR
    ========================= */

    console.log("\nCREAR TARJETA")

    const primeraLista = await Lista.findOne()

    if (!primeraLista) {
      throw new Error("No hay listas. Ejecuta seed.js primero.")
    }

    const nuevaTarjeta = await Tarjeta.create({
      titulo: "Tarjeta CRUD",
      descripcion: "Creada desde test-crud",
      estado: "Pendiente",
      listaId: primeraLista.id
    })

    console.log("\nTARJETA CREADA")
    console.table([nuevaTarjeta.toJSON()])


    /* =========================
       LEER TABLERO CON LISTAS Y TARJETAS
    ========================= */

    console.log("\nLEER TABLERO CON LISTAS Y TARJETAS")

    const tablero = await Tablero.findOne({
      include: {
        model: Lista,
        include: Tarjeta
      }
    })

    console.log("\nTABLERO")
    console.table([{
      id: tablero.id,
      nombre: tablero.nombre,
      descripcion: tablero.descripcion
    }])


    console.log("\nLISTAS")

    const listas = tablero.Listas.map(lista => ({
      id: lista.id,
      nombre: lista.nombre,
      tableroId: lista.tableroId
    }))

    console.table(listas)


    console.log("\nTARJETAS")

    const tarjetas = tablero.Listas.flatMap(lista =>
      lista.Tarjetas.map(t => ({
        id: t.id,
        titulo: t.titulo,
        estado: t.estado,
        listaId: t.listaId
      }))
    )

    console.table(tarjetas)


    /* =========================
       LEER USUARIO CON TABLEROS
    ========================= */

    console.log("\nLEER USUARIO CON SUS TABLEROS")

    const usuario = await Usuario.findOne({
      include: Tablero
    })

    console.table([{
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email
    }])

    console.table(
      usuario.Tableros.map(t => ({
        id: t.id,
        nombre: t.nombre,
        usuarioId: t.usuarioId
      }))
    )


    /* =========================
       ACTUALIZAR
    ========================= */

    console.log("\nACTUALIZAR TARJETA")

    const tarjetaActualizar = await Tarjeta.findOne()

    if (tarjetaActualizar) {

      const estadoAntes = {
        id: tarjetaActualizar.id,
        titulo: tarjetaActualizar.titulo,
        estado: tarjetaActualizar.estado
      }

      await tarjetaActualizar.update({
        titulo: "Tarjeta ACTUALIZADA CRUD",
        estado: "Completada"
      })

      const estadoDespues = {
        id: tarjetaActualizar.id,
        titulo: tarjetaActualizar.titulo,
        estado: tarjetaActualizar.estado
      }

      console.log("Antes:")
      console.table([estadoAntes])

      console.log("Despues:")
      console.table([estadoDespues])

    }


    /* =========================
       BORRAR
    ========================= */

    console.log("\nBORRAR TARJETA")

    const tarjetaEliminar = await Tarjeta.findOne({
      where: { titulo: "Tarjeta CRUD" }
    })

    if (tarjetaEliminar) {

      const datosEliminados = tarjetaEliminar.toJSON()

      await tarjetaEliminar.destroy()

      console.log("Tarjeta eliminada:")
      console.table([datosEliminados])

    } else {

      console.log("No se encontro tarjeta para eliminar")

    }


    /* =========================
       FINAL
    ========================= */

    console.log("\nPRUEBAS CRUD FINALIZADAS")

  } catch (error) {

    console.error("\nError en test-crud:", error.message)

  } finally {

    await sequelize.close()

  }

}

testCRUD()
