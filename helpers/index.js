export const Fecha = fecha =>{
    const fechaNueva = new Date(fecha*1000)
    const opciones = {
        month: 'long',
        year: 'numeric',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('en-US',opciones)
} 