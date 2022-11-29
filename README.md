![](https://imageshack.com/i/pojYEHPpp)
![](https://imagizer.imageshack.com/v2/320x240q90/924/jYEHPp.png)
<img src="https://imagizer.imageshack.com/v2/150x100q90/922/Al2xoI.png">

Tecnológico Nacional de México  
Campus Ensenada  
Ingeniería en sistemas computacionales  
Programación de dispositivos móviles IOS  

Documentación de proyecto: sistema para jardín de niños Aida Sullivan de Rodríguez

Docente:  
Xenia Padilla Madrid

Equipo de desarrollo:  
Joel Drew  
Ramón Sandoval  
Orlando Romero  
Gustavo Romero  

## Definición general del proyecto de software:

El proyecto a realizar consiste en una página web responsiva, ya que será utilizada en gran parte por dispositivos móviles, la cual representará el tablón o mural del jardín de niños, en donde se crearán “publicaciones” de cosas relacionadas a la escuela, como eventos o tareas, se manejarán cuentas, empezando por la de administrador, que controla todo, y cuentas para profesores y padres de familia, el administrador podrá agregar profesores, y los profesores podrán crear publicaciones, los padres de familia se limitarán a solo ver las publicaciones.

El objetivo del proyecto es solventar la problemática del mural físico, el cual representa cierta cantidad de tiempo, dinero y contaminación, ya que el sistema no necesita de materiales físicos ni mucho tiempo para realizar su propósito.

## Especificación de requerimientos del proyecto:

Los alcances del proyecto están definidos por el tiempo de desarrollo del mismo, se limitará a cumplir con el objetivo general del proyecto, sin posibilidades de agregar extras o mejoras, posiblemente de diseño únicamente, para que la experiencia con usuarios poco relacionados con la tecnología pueda usar la página de manera intuitiva.

## Procedimientos de instalación y prueba:

El proyecto puede ser ejecutado en cualquier dispositivo, de escritorio o móvil, debido a que consiste en una página web responsiva. 

Obtención:
La página estará hosteada en versel y la base de datos en fire base. Se les otorgara un enlace para el acceso a la página y las respectivas credenciales de acceso.

## Especificación de procedimientos:

Información de auditoria: El proyecto no es actualización de algún otro, ni basado en otros funcionamientos, es totalmente original desarrollado desde cero, con el propósito de proveerlo a la escuela jardín de niños Aida Sullivan de Rodríguez.

## Herramientas utilizadas:

Para la base de codificación de la página se hizo uso del entorno de desarrollo Visual Studio Code, a base de lenguaje javascript y next.js como framework de desarrollo, la base de datos será creada y monitoreada con fire base, que será donde se guarden las cuentas registradas en la página. 

Para el predesarrollo se está haciendo uso de figma, para representar las ventanas que contendrá la página, donde se representarán las opciones, botones, espacios de texto, etc. Así como una vista del diseño general.

Finalmente, para la organización del desarrollo entre los integrantes del equipo se hace uso de la herramienta trello, donde se hace un listado de las tareas para continuar con el desarrollo del proyecto.

## Planificación:

La metodología utilizada para el desarrollo del proyecto es Scrum, Scrum es un framework que se utiliza dentro de equipos que manejan proyectos de alta incertidumbre. Se trata de un marco de trabajo por el cual las personas pueden abordar problemas complejos adaptativos, a la vez que entregar productos del máximo valor posible productiva y creativamente. Scrum es liviano y fácil de entender, pero, a la vez, difícil de dominar del todo. Este framework favorece el time to market y la entrega rápida de MVP (mínimos productos viables).

Dividimos los integrantes del equipo en 4 areas, back end, front end, líder y documentador, cada uno con importantes tareas para el desarrollo del software.

# Arquitectura del sistema:
## Diagrama de módulos:

![](https://imageshack.com/i/pnc2U7zPj)
<img src="https://imagizer.imageshack.com/img923/9875/c2U7zP.jpg">

### Descripciones de los módulos:
Admin – Alumnos – Modal: Este módulo cumple la función para registrar alumnos, con ciertos datos previamente adquiridos, de tal manera que se guarda la información en una base de datos en la nube.

Admin Alumnos: Es la pantalla principal donde se encuentran los alumnos registrados, aquí se pueden eliminar o modificar, también se encuentra el botón para registrar más alumnos.

Login: En este módulo se encuentra el inicio de sesión para entrar al sistema, se requieren el correo electrónico y contraseña previamente registrados, se encuentra el botón de inicio de sesión y otro para recuperar contraseña.

Admin – grupo modal: En este módulo podemos registrar los grupos que le correspondan a los maestros, pedirá grado y grupo.

Admin grupo: En este módulo se encuentra la lista de grupos, se podrán editar o eliminar y cuenta con el botón de agregar grupos.

Admin – post: Aquí podremos ver las publicaciones, donde se verá el grupo al que va dirigido y la información correspondiente de cada publicación, también contará con un botón para agregar publicaciones.

Admin – personal: En este modal se verán los profesores, desde el punto de vista del administrador, esta opción solo le aparecerá al administrador, y contará con una lista de los profesores y un botón para agregar más profesores en caso de necesitarlo.

Docente – post – modal: En este módulo aparecerá una vez se pulse el botón de agregar publicación, aquí pedirá el título, el asunto el contenido de la publicación y la fecha de entrega, finalmente el botón de publicar.

Admin – personal – modal: En este modal se encuentra el registro del personal, pedirá el nombre, tipo de usuario, asignar grupo (desplegará las opciones con los grupos disponibles), el correo y la contraseña, así como el botón para registrar y cerrar el modal.

## Dependencias externas:
Fire base: Firebase de Google es una plataforma en la nube para el desarrollo de aplicaciones web y móvil. Está disponible para distintas plataformas (iOS, Android y web), con lo que es más rápido trabajar en el desarrollo.

## Tecnologías utilizadas:
* Fire base
* NextJS
* NoteJS
* Java script
* Mantine
* Table icons
* Versel
* React
* Css
