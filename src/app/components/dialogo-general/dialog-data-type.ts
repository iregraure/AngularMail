// Interfaz para definir el tipo de dialogo
export interface DialogDataType
{
    tipoDialogo: number,
    texto: string
}

// Clase que define los tipos de diálogos y de respuestas de los botones
export class DialogTypes
{
    public static readonly ESPERANDO = 1;
    public static readonly ERROR = 2;
    public static readonly CONFIRMACION = 3;
    public static readonly INFORMACION = 4;

    public static readonly CANCELAR = 0;
    public static readonly ACEPTAR = 1;
}