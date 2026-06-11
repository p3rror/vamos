import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ============================================================
   ¡VAMOS! v2 — španielčina pre Slovákov
   Lekcie · Slovník po témach · SRS kartičky · Quiz · Písanie
   Frázy · Slovesá · Audio výslovnosť (TTS)
   ============================================================ */

/* ---------------- SLOVNÁ ZÁSOBA PO TÉMACH ---------------- */
/* formát: [español, slovensky, príkladová veta] */

const CATS = {
  1: [
    { name: "Pozdravy a zdvorilosť", icon: "👋", words: [
      ["hola","ahoj","¡Hola! ¿Qué tal?"],
      ["adiós","dovidenia","Adiós, hasta mañana."],
      ["gracias","ďakujem","Muchas gracias por todo."],
      ["por favor","prosím","Un café, por favor."],
      ["sí","áno","Sí, claro."],
      ["no","nie","No, gracias."],
    ]},
    { name: "Jedlo a pitie", icon: "🥖", words: [
      ["el agua","voda","Quiero beber agua."],
      ["el pan","chlieb","El pan está muy rico."],
      ["la leche","mlieko","La leche está fría."],
      ["el café","káva","Me gusta el café."],
      ["la cerveza","pivo","Una cerveza fría, por favor."],
      ["el vino","víno","El vino español es famoso."],
      ["la fruta","ovocie","Como fruta cada día."],
      ["la manzana","jablko","La manzana es roja."],
      ["la naranja","pomaranč","El zumo de naranja está rico."],
      ["el queso","syr","Me encanta el queso."],
      ["la carne","mäso","No como mucha carne."],
      ["el pescado","ryba","El pescado está fresco."],
      ["el arroz","ryža","La paella lleva arroz."],
      ["el huevo","vajce","Como dos huevos por la mañana."],
    ]},
    { name: "Domov, veci a zvieratá", icon: "🏠", words: [
      ["la casa","dom","Mi casa es pequeña."],
      ["la mesa","stôl","El libro está en la mesa."],
      ["la silla","stolička","La silla es cómoda."],
      ["el libro","kniha","Leo un libro interesante."],
      ["el perro","pes","El perro es mi amigo."],
      ["el gato","mačka","El gato duerme todo el día."],
    ]},
    { name: "Ľudia a rodina", icon: "👨‍👩‍👧", words: [
      ["el hombre","muž","El hombre trabaja mucho."],
      ["la mujer","žena","La mujer habla español."],
      ["el niño","dieťa","El niño juega en casa."],
      ["la familia","rodina","Mi familia es grande."],
      ["la madre","matka","Mi madre cocina muy bien."],
      ["el padre","otec","Mi padre trabaja en Bratislava."],
      ["el hermano","brat","Tengo un hermano."],
      ["la hermana","sestra","Mi hermana vive en Madrid."],
      ["el amigo","priateľ","Pedro es mi amigo."],
    ]},
    { name: "Čísla 1–20", icon: "🔢", words: [
      ["uno","jeden","Tengo uno."],
      ["dos","dva","Dos cafés, por favor."],
      ["tres","tri","Son las tres."],
      ["cuatro","štyri","Cuatro personas."],
      ["cinco","päť","Cinco euros."],
      ["seis","šesť","Seis días."],
      ["siete","sedem","Siete años."],
      ["ocho","osem","Ocho horas."],
      ["nueve","deväť","Nueve meses."],
      ["diez","desať","Diez minutos."],
      ["once","jedenásť","Son las once."],
      ["doce","dvanásť","Es mediodía, las doce."],
      ["trece","trinásť","El día trece de mayo."],
      ["catorce","štrnásť","Catorce días son dos semanas."],
      ["quince","pätnásť","Quince minutos, por favor."],
      ["dieciséis","šestnásť","Dieciséis euros en total."],
      ["diecisiete","sedemnásť","El tren sale a las diecisiete."],
      ["dieciocho","osemnásť","Tiene dieciocho años."],
      ["diecinueve","devätnásť","El siglo diecinueve."],
      ["veinte","dvadsať","Veinte personas en la reunión."],
    ]},
    { name: "Farby", icon: "🎨", words: [
      ["rojo","červený","El coche es rojo."],
      ["azul","modrý","El cielo es azul."],
      ["verde","zelený","Me gusta el color verde."],
      ["amarillo","žltý","El sol es amarillo."],
      ["negro","čierny","Tengo un gato negro."],
      ["blanco","biely","La casa es blanca."],
    ]},
    { name: "Vlastnosti", icon: "✨", words: [
      ["grande","veľký","Madrid es una ciudad grande."],
      ["pequeño","malý","Mi piso es pequeño."],
      ["bueno","dobrý","Es un libro muy bueno."],
      ["malo","zlý","El tiempo está malo."],
      ["nuevo","nový","Tengo un trabajo nuevo."],
      ["viejo","starý","Es un libro viejo."],
    ]},
    { name: "Slovesá a čas", icon: "⏰", words: [
      ["comer","jesť","Quiero comer paella."],
      ["beber","piť","¿Quieres beber algo?"],
      ["hablar","hovoriť","Hablo un poco de español."],
      ["vivir","žiť","Vivo en Eslovaquia."],
      ["trabajar","pracovať","Trabajo en una empresa."],
      ["el día","deň","Hoy es un buen día."],
      ["la noche","noc","La noche es larga."],
      ["hoy","dnes","Hoy estudio español."],
      ["mañana","zajtra","Mañana voy a Madrid."],
      ["ayer","včera","Ayer trabajé mucho."],
      ["ahora","teraz","Ahora estudio español."],
      ["siempre","vždy","Siempre desayuno café."],
      ["nunca","nikdy","Nunca llego tarde."],
      ["también","tiež","Yo también hablo inglés."],
      ["mucho","veľa","Trabajo mucho."],
      ["poco","málo","Duermo poco."],
    ]},
    { name: "Dni v týždni", icon: "📅", words: [
      ["el lunes","pondelok","El lunes empiezo a trabajar."],
      ["el martes","utorok","El martes tengo una reunión."],
      ["el miércoles","streda","El miércoles voy al gimnasio."],
      ["el jueves","štvrtok","El jueves ceno con amigos."],
      ["el viernes","piatok","¡Por fin es viernes!"],
      ["el sábado","sobota","El sábado descanso."],
      ["el domingo","nedeľa","El domingo cocino paella."],
    ]},
    { name: "Telo", icon: "🫀", words: [
      ["la cabeza","hlava","Me duele la cabeza."],
      ["la mano","ruka","Escribo con la mano derecha."],
      ["el ojo","oko","Tiene los ojos azules."],
      ["la boca","ústa","Abre la boca."],
      ["el pie","noha (chodidlo)","Voy a pie al trabajo."],
      ["el corazón","srdce","El corazón late rápido."],
    ]},
    { name: "Oblečenie", icon: "👕", words: [
      ["la camisa","košeľa","Llevo una camisa blanca."],
      ["los pantalones","nohavice","Estos pantalones son nuevos."],
      ["los zapatos","topánky","Mis zapatos son cómodos."],
      ["la chaqueta","bunda","Hace frío, lleva chaqueta."],
      ["el vestido","šaty","El vestido es elegante."],
      ["el sombrero","klobúk","En verano llevo sombrero."],
    ]},
    { name: "Opytovacie slová", icon: "❓", words: [
      ["qué","čo","¿Qué quieres comer?"],
      ["quién","kto","¿Quién es ella?"],
      ["dónde","kde","¿Dónde vives?"],
      ["cuándo","kedy","¿Cuándo llegas?"],
      ["por qué","prečo","¿Por qué estudias español?"],
      ["cómo","ako","¿Cómo estás?"],
      ["cuánto","koľko","¿Cuánto cuesta esto?"],
    ]},
  ],
  2: [
    { name: "Doprava a cestovanie", icon: "✈️", words: [
      ["el aeropuerto","letisko","El aeropuerto está lejos."],
      ["el tren","vlak","El tren sale a las ocho."],
      ["el billete","lístok","Necesito un billete a Sevilla."],
      ["la estación","stanica","La estación está en el centro."],
      ["el hotel","hotel","El hotel tiene piscina."],
      ["la habitación","izba","La habitación es grande."],
      ["la playa","pláž","La playa está cerca del hotel."],
      ["la maleta","kufor","Mi maleta es pequeña."],
      ["el avión","lietadlo","El avión sale por la mañana."],
      ["el autobús","autobus","El autobús llega en diez minutos."],
      ["el coche","auto","Mi coche es viejo pero funciona."],
      ["la bicicleta","bicykel","Voy al trabajo en bicicleta."],
      ["el metro","metro","El metro es rápido y barato."],
      ["el taxi","taxík","Tomamos un taxi al hotel."],
      ["conducir","šoférovať","No me gusta conducir de noche."],
    ]},
    { name: "Mesto a orientácia", icon: "🗺️", words: [
      ["la ciudad","mesto","Bratislava es una ciudad bonita."],
      ["el pueblo","dedina","El pueblo es muy tranquilo."],
      ["la calle","ulica","Vivo en esta calle."],
      ["la plaza","námestie","La plaza está llena de gente."],
      ["el mercado","trh","Compro fruta en el mercado."],
      ["la tienda","obchod","La tienda abre a las nueve."],
      ["cerca","blízko","El bar está cerca."],
      ["lejos","ďaleko","¿Está lejos el centro?"],
      ["a la derecha","doprava","Gira a la derecha."],
      ["a la izquierda","doľava","El banco está a la izquierda."],
      ["todo recto","rovno","Sigue todo recto."],
    ]},
    { name: "Reštaurácia a peniaze", icon: "🍽️", words: [
      ["el restaurante","reštaurácia","El restaurante es excelente."],
      ["la cuenta","účet","La cuenta, por favor."],
      ["el desayuno","raňajky","El desayuno está incluido."],
      ["el almuerzo","obed","El almuerzo es a las dos."],
      ["la cena","večera","La cena fue deliciosa."],
      ["el dinero","peniaze","No tengo mucho dinero."],
      ["barato","lacný","Este hotel es barato."],
      ["caro","drahý","El vino es muy caro aquí."],
      ["abierto","otvorený","El museo está abierto."],
      ["cerrado","zatvorený","La tienda está cerrada."],
      ["pagar","platiť","¿Puedo pagar con tarjeta?"],
    ]},
    { name: "Čas a počasie", icon: "🌦️", words: [
      ["el tiempo","počasie","¿Qué tiempo hace hoy?"],
      ["hace calor","je horúco","En agosto hace mucho calor."],
      ["hace frío","je zima","En enero hace frío."],
      ["llueve","prší","Hoy llueve todo el día."],
      ["el sol","slnko","Hay mucho sol en la playa."],
      ["la semana","týždeň","La semana tiene siete días."],
      ["el mes","mesiac","El mes que viene voy a España."],
      ["el año","rok","Este año estudio español."],
      ["la hora","hodina","¿Qué hora es?"],
      ["temprano","skoro","Me levanto temprano."],
      ["tarde","neskoro","Llego tarde al trabajo."],
      ["la primavera","jar","En primavera todo es verde."],
      ["el verano","leto","En verano vamos a la playa."],
      ["el otoño","jeseň","El otoño es mi estación favorita."],
      ["el invierno","zima (ročné obdobie)","En invierno esquiamos."],
      ["la nieve","sneh","Hay mucha nieve en las montañas."],
      ["el viento","vietor","Hace mucho viento hoy."],
    ]},
    { name: "Pocity a vlastnosti", icon: "😊", words: [
      ["rápido","rýchly","El tren es muy rápido."],
      ["lento","pomalý","El internet es lento."],
      ["cansado","unavený","Estoy muy cansado hoy."],
      ["feliz","šťastný","Estoy feliz aquí."],
      ["triste","smutný","¿Por qué estás triste?"],
      ["enfermo","chorý","Mi hermano está enfermo."],
    ]},
    { name: "Užitočné slovesá", icon: "🔧", words: [
      ["ayudar","pomôcť","¿Me puedes ayudar?"],
      ["buscar","hľadať","Busco la estación de tren."],
      ["encontrar","nájsť","No encuentro mi maleta."],
      ["llegar","prísť","¿Cuándo llega el tren?"],
      ["salir","odísť","El autobús sale en cinco minutos."],
      ["comprar","kúpiť","Quiero comprar un regalo."],
      ["necesitar","potrebovať","Necesito ayuda."],
      ["esperar","čakať","Espero el autobús."],
      ["entender","rozumieť","No entiendo la pregunta."],
      ["preguntar","pýtať sa","¿Puedo preguntar algo?"],
      ["contestar","odpovedať","Contesta el teléfono, por favor."],
      ["abrir","otvoriť","¿A qué hora abren la tienda?"],
      ["cerrar","zatvoriť","Cierran a las diez."],
      ["empezar","začať","La película empieza a las ocho."],
      ["terminar","skončiť","Termino el trabajo a las cinco."],
    ]},
    { name: "Zdravie", icon: "🩺", words: [
      ["el médico","lekár","Necesito ver a un médico."],
      ["la farmacia","lekáreň","La farmacia está en la esquina."],
      ["el hospital","nemocnica","El hospital está cerca."],
      ["la medicina","liek","Tomo la medicina dos veces al día."],
      ["el dolor","bolesť","Tengo dolor de cabeza."],
      ["la gripe","chrípka","Mi colega tiene gripe."],
      ["la cita","termín / stretnutie","Tengo cita con el médico."],
    ]},
    { name: "Nakupovanie", icon: "🛍️", words: [
      ["la talla","veľkosť (oblečenia)","¿Tiene una talla más grande?"],
      ["el regalo","darček","Busco un regalo para mi hermana."],
      ["la rebaja","zľava","Hay rebajas en enero."],
      ["la tarjeta","karta","Pago con tarjeta."],
      ["el efectivo","hotovosť","Solo aceptan efectivo."],
      ["la bolsa","taška","¿Quiere una bolsa?"],
      ["probarse","vyskúšať si","¿Puedo probarme esta camisa?"],
    ]},
    { name: "Voľný čas a šport", icon: "⚽", words: [
      ["el deporte","šport","El deporte es bueno para la salud."],
      ["el fútbol","futbal","El fútbol es muy popular en España."],
      ["la película","film","Vimos una película interesante."],
      ["la música","hudba","Escucho música mientras trabajo."],
      ["el partido","zápas","El partido empieza a las nueve."],
      ["el gimnasio","posilňovňa","Voy al gimnasio tres veces por semana."],
      ["nadar","plávať","Me gusta nadar en el mar."],
      ["correr","behať","Corro por la mañana."],
      ["bailar","tancovať","En España la gente baila mucho."],
      ["leer","čítať","Leo antes de dormir."],
    ]},
    { name: "Príroda", icon: "🌲", words: [
      ["el bosque","les","El bosque es tranquilo."],
      ["la montaña","hora / vrch","Las montañas de Eslovaquia son bonitas."],
      ["el río","rieka","El Danubio es un río grande."],
      ["el mar","more","El mar Mediterráneo es cálido."],
      ["el lago","jazero","Nadamos en el lago."],
      ["la isla","ostrov","Kefalonia es una isla griega."],
      ["el campo","vidiek","Mis abuelos viven en el campo."],
    ]},
  ],
  3: [
    { name: "Práca a kariéra", icon: "💼", words: [
      ["el trabajo","práca","Mi trabajo es interesante."],
      ["la empresa","firma","Trabajo en una empresa internacional."],
      ["la reunión","porada","La reunión empieza a las diez."],
      ["el desarrollo","vývoj","Trabajo en desarrollo de software."],
      ["la herramienta","nástroj","Es una herramienta muy útil."],
      ["el conocimiento","vedomosti","El conocimiento es poder."],
      ["la experiencia","skúsenosť","Tengo experiencia en redes."],
      ["el objetivo","cieľ","Mi objetivo es ser independiente."],
      ["el éxito","úspech","El éxito requiere trabajo."],
      ["el fracaso","neúspech","El fracaso es parte del camino."],
      ["tener éxito","uspieť","Quiero tener éxito con mi empresa."],
    ]},
    { name: "Spoločnosť", icon: "🌍", words: [
      ["la salud","zdravie","La salud es lo más importante."],
      ["el medio ambiente","životné prostredie","Hay que proteger el medio ambiente."],
      ["la sociedad","spoločnosť","La sociedad cambia rápido."],
      ["el gobierno","vláda","El gobierno anunció nuevas medidas."],
      ["la noticia","správa","¿Has visto las noticias?"],
      ["la opinión","názor","Respeto tu opinión."],
    ]},
    { name: "Abstraktné pojmy", icon: "💭", words: [
      ["el comportamiento","správanie","Su comportamiento fue extraño."],
      ["la costumbre","zvyk","Es una costumbre española."],
      ["el desafío","výzva","Aprender japonés es un desafío."],
      ["la confianza","dôvera","La confianza se gana con tiempo."],
      ["la amistad","priateľstvo","La amistad es importante."],
      ["el recuerdo","spomienka","Tengo buenos recuerdos de Grecia."],
      ["la mentira","lož","No me gustan las mentiras."],
      ["la verdad","pravda","Dime la verdad."],
      ["disponible","dostupný","¿Estás disponible mañana?"],
      ["imprescindible","nevyhnutný","El café es imprescindible por la mañana."],
      ["la libertad","sloboda","La libertad financiera es mi meta."],
      ["la felicidad","šťastie","El dinero no compra la felicidad."],
      ["el miedo","strach","No tengo miedo al cambio."],
      ["la esperanza","nádej","Nunca pierdas la esperanza."],
      ["el esfuerzo","úsilie","El éxito requiere esfuerzo."],
      ["la paciencia","trpezlivosť","La paciencia es una virtud."],
    ]},
    { name: "Spojky a príslovky", icon: "🔗", words: [
      ["aunque","hoci","Aunque llueve, voy a correr."],
      ["sin embargo","avšak","Es caro; sin embargo, lo compro."],
      ["además","okrem toho","Además, habla tres idiomas."],
      ["quizás","možno","Quizás vaya a España este año."],
      ["mientras","zatiaľ čo","Escucho música mientras trabajo."],
      ["a menudo","často","Viajo a menudo por trabajo."],
      ["apenas","sotva","Apenas duermo cinco horas."],
      ["de repente","zrazu","De repente, empezó a llover."],
      ["por si acaso","pre istotu","Llevo paraguas por si acaso."],
      ["estar de acuerdo","súhlasiť","Estoy de acuerdo contigo."],
      ["en cuanto","len čo","En cuanto llegue, te llamo."],
      ["a pesar de","napriek","A pesar del frío, salimos."],
      ["por lo tanto","preto","Llueve; por lo tanto, me quedo en casa."],
      ["ya que","keďže","Ya que estás aquí, ayúdame."],
      ["en cambio","naproti tomu","Yo trabajo; él, en cambio, descansa."],
      ["incluso","dokonca","Incluso los expertos se equivocan."],
    ]},
    { name: "Pokročilé slovesá", icon: "🔧", words: [
      ["desarrollar","vyvíjať","Desarrollo aplicaciones web."],
      ["mejorar","zlepšiť","Quiero mejorar mi español."],
      ["empeorar","zhoršiť","La situación puede empeorar."],
      ["aprender","naučiť sa","Aprendo algo nuevo cada día."],
      ["enseñar","učiť (niekoho)","Mi madre enseña matemáticas."],
      ["recordar","pamätať si","No recuerdo su nombre."],
      ["olvidar","zabudnúť","Olvidé las llaves en casa."],
      ["elegir","vybrať si","Es difícil elegir."],
      ["decidir","rozhodnúť sa","Decidí cambiar de trabajo."],
      ["intentar","pokúsiť sa","Voy a intentarlo otra vez."],
      ["conseguir","dosiahnuť","Conseguí el certificado."],
      ["evitar","vyhnúť sa","Intento evitar el estrés."],
      ["aprovechar","využiť","Hay que aprovechar el tiempo."],
      ["lograr","dokázať / dosiahnuť","Logré terminar la tesis."],
      ["soler","mávať vo zvyku","Suelo levantarme a las seis."],
      ["darse cuenta","uvedomiť si","Me di cuenta del error."],
      ["quejarse","sťažovať sa","No sirve de nada quejarse."],
      ["atreverse","odvážiť sa","Atrévete a empezar."],
      ["fijarse","všimnúť si","Fíjate en los detalles."],
    ]},
    { name: "Technológie a IT", icon: "💻", words: [
      ["la red","sieť","Trabajo con redes informáticas."],
      ["el servidor","server","El servidor no responde."],
      ["la nube","cloud / oblak","Guardamos los datos en la nube."],
      ["el archivo","súbor","No encuentro el archivo."],
      ["la contraseña","heslo","Cambia tu contraseña a menudo."],
      ["la seguridad","bezpečnosť","La seguridad es mi prioridad."],
      ["el usuario","používateľ","El usuario no puede entrar."],
      ["los datos","dáta / údaje","Analizamos los datos cada semana."],
      ["el fallo","chyba / zlyhanie","Hay un fallo en el sistema."],
      ["actualizar","aktualizovať","Hay que actualizar el software."],
      ["descargar","stiahnuť","Descarga la aplicación gratis."],
      ["programar","programovať","Aprendí a programar solo."],
    ]},
    { name: "Podnikanie a peniaze", icon: "📈", words: [
      ["el cliente","klient","El cliente siempre tiene razón."],
      ["el negocio","biznis / podnik","Quiero montar mi propio negocio."],
      ["la factura","faktúra","Envío la factura a fin de mes."],
      ["el presupuesto","rozpočet","El presupuesto es limitado."],
      ["el impuesto","daň","Los impuestos suben cada año."],
      ["la inversión","investícia","Es una buena inversión."],
      ["el beneficio","zisk","La empresa tuvo beneficios."],
      ["la marca","značka","La marca es importante."],
      ["vender","predávať","Vendemos servicios de consultoría."],
      ["invertir","investovať","Invierto en mi educación."],
      ["ahorrar","šetriť","Ahorro para ser independiente."],
    ]},
    { name: "Vzťahy a komunikácia", icon: "🗣️", words: [
      ["la pareja","partner / pár","Viajo con mi pareja."],
      ["la boda","svadba","La boda es en junio."],
      ["el consejo","rada","Gracias por el consejo."],
      ["la conversación","rozhovor","Fue una conversación interesante."],
      ["discutir","hádať sa / diskutovať","No quiero discutir contigo."],
      ["confiar","dôverovať","Confío en mi equipo."],
      ["apoyar","podporiť","Mi familia me apoya."],
      ["prometer","sľúbiť","Te lo prometo."],
      ["mentir","klamať","No me gusta mentir."],
      ["perdonar","odpustiť","Perdona, fue mi culpa."],
    ]},
  ],
};

const PHRASES = {
  1: [
    ["¿Cómo te llamas?","Ako sa voláš?"],["Me llamo Peter.","Volám sa Peter."],
    ["¿Cómo estás?","Ako sa máš?"],["Mucho gusto.","Teší ma."],
    ["No entiendo.","Nerozumiem."],["¿Hablas inglés?","Hovoríš po anglicky?"],
    ["Buenos días.","Dobré ráno."],["Buenas noches.","Dobrú noc."],
    ["Lo siento.","Mrzí ma to."],["Hasta luego.","Zatiaľ ahoj."],
  ],
  2: [
    ["¿Cuánto cuesta?","Koľko to stojí?"],["La cuenta, por favor.","Účet, prosím."],
    ["¿Dónde está el baño?","Kde je toaleta?"],["Quisiera una mesa para dos.","Chcel by som stôl pre dvoch."],
    ["¿A qué hora sale el tren?","O koľkej odchádza vlak?"],["¿Me puede ayudar?","Môžete mi pomôcť?"],
    ["Estoy perdido.","Som stratený."],["¿Tiene habitaciones libres?","Máte voľné izby?"],
    ["Una cerveza, por favor.","Jedno pivo, prosím."],["¿Puedo pagar con tarjeta?","Môžem platiť kartou?"],
  ],
  3: [
    ["¿Qué opinas de esto?","Čo si o tom myslíš?"],["En mi opinión...","Podľa môjho názoru..."],
    ["Estoy totalmente de acuerdo.","Úplne súhlasím."],["No estoy de acuerdo contigo.","Nesúhlasím s tebou."],
    ["Depende de la situación.","Záleží od situácie."],["Vale la pena intentarlo.","Stojí to za pokus."],
    ["Cuanto antes, mejor.","Čím skôr, tým lepšie."],["Me da igual.","Je mi to jedno."],
    ["Tengo ganas de viajar.","Mám chuť cestovať."],["Lo haré por si acaso.","Urobím to pre istotu."],
  ],
};

const PRONOUNS = ["yo","tú","él/ella","nosotros","vosotros","ellos/ellas"];

const VERBS = [
  { inf:"hablar", sk:"hovoriť", lvl:1, tense:"prítomný čas", c:["hablo","hablas","habla","hablamos","habláis","hablan"] },
  { inf:"comer", sk:"jesť", lvl:1, tense:"prítomný čas", c:["como","comes","come","comemos","coméis","comen"] },
  { inf:"vivir", sk:"žiť", lvl:1, tense:"prítomný čas", c:["vivo","vives","vive","vivimos","vivís","viven"] },
  { inf:"ser", sk:"byť (trvalé)", lvl:1, tense:"prítomný čas", c:["soy","eres","es","somos","sois","son"] },
  { inf:"estar", sk:"byť (stav)", lvl:1, tense:"prítomný čas", c:["estoy","estás","está","estamos","estáis","están"] },
  { inf:"tener", sk:"mať", lvl:1, tense:"prítomný čas", c:["tengo","tienes","tiene","tenemos","tenéis","tienen"] },
  { inf:"ir", sk:"ísť", lvl:2, tense:"prítomný čas", c:["voy","vas","va","vamos","vais","van"] },
  { inf:"hacer", sk:"robiť", lvl:2, tense:"prítomný čas", c:["hago","haces","hace","hacemos","hacéis","hacen"] },
  { inf:"querer", sk:"chcieť", lvl:2, tense:"prítomný čas", c:["quiero","quieres","quiere","queremos","queréis","quieren"] },
  { inf:"poder", sk:"môcť", lvl:2, tense:"prítomný čas", c:["puedo","puedes","puede","podemos","podéis","pueden"] },
  { inf:"venir", sk:"prísť", lvl:2, tense:"prítomný čas", c:["vengo","vienes","viene","venimos","venís","vienen"] },
  { inf:"decir", sk:"povedať", lvl:2, tense:"prítomný čas", c:["digo","dices","dice","decimos","decís","dicen"] },
  { inf:"ser / ir", sk:"byť / ísť", lvl:3, tense:"pretérito", c:["fui","fuiste","fue","fuimos","fuisteis","fueron"] },
  { inf:"tener", sk:"mať", lvl:3, tense:"pretérito", c:["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"] },
  { inf:"hacer", sk:"robiť", lvl:3, tense:"pretérito", c:["hice","hiciste","hizo","hicimos","hicisteis","hicieron"] },
  { inf:"estar", sk:"byť (stav)", lvl:3, tense:"pretérito", c:["estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron"] },
  { inf:"decir", sk:"povedať", lvl:3, tense:"pretérito", c:["dije","dijiste","dijo","dijimos","dijisteis","dijeron"] },
  { inf:"hablar", sk:"hovoriť", lvl:3, tense:"futuro", c:["hablaré","hablarás","hablará","hablaremos","hablaréis","hablarán"] },
  { inf:"comer", sk:"jesť", lvl:3, tense:"futuro", c:["comeré","comerás","comerá","comeremos","comeréis","comerán"] },
  { inf:"vivir", sk:"žiť", lvl:3, tense:"futuro", c:["viviré","vivirás","vivirá","viviremos","viviréis","vivirán"] },
  { inf:"tener", sk:"mať", lvl:3, tense:"futuro", c:["tendré","tendrás","tendrá","tendremos","tendréis","tendrán"] },
  { inf:"hacer", sk:"robiť", lvl:3, tense:"futuro", c:["haré","harás","hará","haremos","haréis","harán"] },
  { inf:"poder", sk:"môcť", lvl:3, tense:"futuro", c:["podré","podrás","podrá","podremos","podréis","podrán"] },
  { inf:"hablar", sk:"hovoriť", lvl:3, tense:"imperfecto", c:["hablaba","hablabas","hablaba","hablábamos","hablabais","hablaban"] },
  { inf:"comer", sk:"jesť", lvl:3, tense:"imperfecto", c:["comía","comías","comía","comíamos","comíais","comían"] },
  { inf:"vivir", sk:"žiť", lvl:3, tense:"imperfecto", c:["vivía","vivías","vivía","vivíamos","vivíais","vivían"] },
  { inf:"ser", sk:"byť (trvalé)", lvl:3, tense:"imperfecto", c:["era","eras","era","éramos","erais","eran"] },
  { inf:"ir", sk:"ísť", lvl:3, tense:"imperfecto", c:["iba","ibas","iba","íbamos","ibais","iban"] },
  { inf:"ver", sk:"vidieť", lvl:3, tense:"imperfecto", c:["veía","veías","veía","veíamos","veíais","veían"] },
];

/* ---------------- POMOCNÉ ---------------- */

const INTERVALS = [60e3, 10*60e3, 864e5, 3*864e5, 7*864e5, 14*864e5, 30*864e5];
const SESSION_SIZE = 12;
const LESSON_SIZE = 5;

const norm = (s) =>
  s.toLowerCase().trim()
   .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[¿¡?!.,]/g, "").replace(/\s+/g, " ");

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const allWords = (level) => CATS[level].flatMap((c) => c.words.map(([es, sk, ex]) => ({ es, sk, ex, cat: c.name })));

/* Audio — španielske TTS v prehliadači */
let voiceCache = null;
const getVoice = () => {
  try {
    if (voiceCache) return voiceCache;
    const vs = window.speechSynthesis?.getVoices?.() || [];
    voiceCache = vs.find((v) => v.lang === "es-ES") || vs.find((v) => v.lang?.startsWith("es")) || null;
    return voiceCache;
  } catch (e) { return null; }
};
const speak = (text) => {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 0.88;
    const v = getVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) { /* TTS nedostupné */ }
};

/* krátky zvukový efekt cez WebAudio (bez súborov) */
let audioCtx = null;
const chime = (ok) => {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const notes = ok ? [523.25, 659.25, 783.99] : [220, 174.61];
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      const t = now + i * 0.09;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + 0.2);
    });
  } catch (e) { /* audio nedostupné */ }
};

/* ---------------- STORAGE ---------------- */
const SKEY = "vamos-es-v2";
const memFallback = { data: null };

async function loadData() {
  try {
    const raw = localStorage.getItem(SKEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* poškodené dáta */ }
  return memFallback.data || null;
}
async function saveData(data) {
  memFallback.data = data;
  try { localStorage.setItem(SKEY, JSON.stringify(data)); } catch (e) { /* storage nedostupné */ }
}

const freshData = () => ({
  srs: {}, xp: 0, streak: 0, lastDay: null, level: 1, learned: {},
  profile: { name: "", avatar: "🦉" },
  dailyGoal: 30,
  dayXP: {},        // "YYYY-MM-DD" -> XP získané v daný deň
  sound: true,
  createdAt: todayKey(),
});

const AVATARS = ["🦉","🐱","🦊","🐸","🐵","🦁","🐧","🐯","🐨","🦄","🐢","🦜"];

/* ---------------- MALÉ KOMPONENTY ---------------- */

const SpeakBtn = ({ text, size = "" }) => (
  <button className={`speak ${size}`} aria-label={`Vyslov ${text}`}
    onClick={(e) => { e.stopPropagation(); speak(text); }}>🔊</button>
);

const Tile = ({ title, sub, icon, onClick, accent, big }) => (
  <button className={`tile ${accent || ""} ${big ? "tile-big" : ""}`} onClick={onClick}>
    <div className="tile-icon" aria-hidden="true">{icon}</div>
    <div className="tile-body">
      <div className="tile-title">{title}</div>
      <div className="tile-sub">{sub}</div>
    </div>
    <div className="tile-arrow">→</div>
  </button>
);

const ProgressBar = ({ value, max }) => (
  <div className="pbar"><div className="pbar-fill" style={{ width: `${max ? (value / max) * 100 : 0}%` }} /></div>
);

const Azulejo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="6" fill="var(--cobalt)" />
    <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="var(--paper)" />
    <circle cx="20" cy="20" r="7" fill="var(--saffron)" />
    <circle cx="20" cy="20" r="3" fill="var(--coral)" />
  </svg>
);

const KnowDot = ({ box }) => {
  if (box === undefined) return <span className="kdot kdot-new" title="Nové slovo">○</span>;
  const cls = box <= 1 ? "kdot-low" : box <= 3 ? "kdot-mid" : "kdot-high";
  const label = box <= 1 ? "Učím sa" : box <= 3 ? "Opakujem" : "Viem";
  return <span className={`kdot ${cls}`} title={label}>●</span>;
};

/* ---------------- APP ---------------- */

export default function App() {
  const [data, setData] = useState(null);
  const [screen, setScreen] = useState({ name: "home" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let d = await loadData();
      if (!d) d = freshData();
      // migrácia starších uložení (doplní chýbajúce polia)
      d = { ...freshData(), ...d };
      if (!d.profile) d.profile = { name: "", avatar: "🦉" };
      if (!d.dayXP) d.dayXP = {};
      const today = todayKey();
      if (d.lastDay !== today) {
        const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        if (d.lastDay !== yest && d.lastDay !== null) d.streak = 0;
      }
      setData(d);
      setLoading(false);
    })();
    // preload hlasov (Chrome ich načítava async)
    try { window.speechSynthesis?.getVoices?.(); } catch (e) {}
  }, []);

  const persist = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      saveData(next);
      return next;
    });
  }, []);

  const addXP = useCallback((amount) => {
    persist((d) => {
      const today = todayKey();
      let { streak, lastDay } = d;
      if (lastDay !== today) {
        const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        streak = lastDay === yest ? streak + 1 : 1;
        lastDay = today;
      }
      const dayXP = { ...(d.dayXP || {}), [today]: ((d.dayXP || {})[today] || 0) + amount };
      return { ...d, xp: d.xp + amount, streak, lastDay, dayXP };
    });
  }, [persist]);

  if (loading || !data) {
    return <div className="app"><Style /><div className="loading">Cargando… ⏳</div></div>;
  }

  const level = data.level;
  const cardId = (type, es) => `${type}:${es}`;
  const vPrefix = "v" + level, pPrefix = "p" + level;

  const dueCount = (() => {
    const now = Date.now();
    let n = 0;
    const ids = [
      ...allWords(level).map((w) => cardId(vPrefix, w.es)),
      ...PHRASES[level].map(([es]) => cardId(pPrefix, es)),
    ];
    for (const id of ids) {
      const s = data.srs[id];
      if (s && s.d <= now) n++;
    }
    return n;
  })();

  const newCount = allWords(level).filter((w) => !data.srs[cardId(vPrefix, w.es)]).length;

  const buildSession = (type, catName) => {
    let pool, prefix;
    if (type === "phrases") {
      pool = PHRASES[level].map(([es, sk]) => ({ es, sk }));
      prefix = pPrefix;
    } else {
      pool = allWords(level).filter((w) => !catName || w.cat === catName);
      prefix = vPrefix;
    }
    const now = Date.now();
    const due = [], fresh = [], later = [];
    for (const w of pool) {
      const id = cardId(prefix, w.es);
      const s = data.srs[id];
      const item = { ...w, id };
      if (!s) fresh.push(item);
      else if (s.d <= now) due.push(item);
      else later.push(item);
    }
    const session = [...shuffle(due), ...shuffle(fresh)].slice(0, SESSION_SIZE);
    if (session.length < 4) session.push(...shuffle(later).slice(0, SESSION_SIZE - session.length));
    return shuffle(session);
  };

  const rateCard = (id, grade) => {
    persist((d) => {
      const cur = d.srs[id] || { b: 0, d: 0 };
      let b = cur.b;
      if (grade === 0) b = 0;
      else if (grade === 2) b = Math.min(b + 1, INTERVALS.length - 1);
      const due = Date.now() + INTERVALS[grade === 1 ? Math.max(b - 1, 0) : b];
      return { ...d, srs: { ...d.srs, [id]: { b, d: due } }, learned: { ...d.learned, [id]: 1 } };
    });
    addXP(grade === 2 ? 5 : grade === 1 ? 3 : 1);
  };

  const totalWords = allWords(level).length;
  const seenWords = allWords(level).filter((w) => data.srs[cardId(vPrefix, w.es)]).length;
  const go = (name, params = {}) => setScreen({ name, ...params });

  return (
    <div className="app">
      <Style />
      <header className="hdr">
        <div className="hdr-brand" onClick={() => go("home")} role="button" tabIndex={0}
             onKeyDown={(e) => e.key === "Enter" && go("home")}>
          <Azulejo />
          <div>
            <h1>¡Vamos!</h1>
            <span className="hdr-sub">španielčina po slovensky</span>
          </div>
        </div>
        <div className="stats">
          <button className="stat avatar-btn" title="Účet" onClick={() => go("account")}>
            {data.profile?.avatar || "🦉"}
          </button>
          <span className="stat" title="Streak">🔥 {data.streak}</span>
          <span className="stat" title="XP">⭐ {data.xp}</span>
          <span className="stat due" title="Na zopakovanie">📥 {dueCount}</span>
        </div>
      </header>

      {screen.name === "home" && (
        <main className="home">
          <DailyGoal data={data} />

          <div className="levels" role="tablist" aria-label="Úroveň">
            {[1, 2, 3].map((l) => (
              <button key={l} role="tab" aria-selected={level === l}
                className={`lvl ${level === l ? "active" : ""}`}
                onClick={() => persist({ level: l })}>
                <strong>{["A1", "A2", "B1"][l - 1]}</strong>
                <span>{["Začiatočník", "Základy", "Pokročilý"][l - 1]}</span>
              </button>
            ))}
          </div>

          <div className="lvl-progress">
            <span>Úroveň {["A1","A2","B1"][level-1]}: {seenWords} / {totalWords} slov začatých</span>
            <ProgressBar value={seenWords} max={totalWords} />
          </div>

          <div className="tiles">
            <Tile icon="🎓" title="Lekcia — nové slová" big accent="t-saffron"
              sub={newCount > 0 ? `${newCount} slov ťa ešte čaká · uč sa po témach` : "Všetko videné — opakuj kartičkami"}
              onClick={() => go("lesson")} />
            <Tile icon="🃏" title="Kartičky" sub={`SRS opakovanie · ${dueCount} čaká`} accent="t-cobalt"
              onClick={() => go("flash")} />
            <Tile icon="📖" title="Slovník" sub={`${CATS[level].length} tém · audio výslovnosť`} accent="t-cobalt"
              onClick={() => go("dict")} />
            <Tile icon="❓" title="Quiz" sub="Multiple choice, oba smery" accent="t-saffron"
              onClick={() => go("quiz")} />
            <Tile icon="⌨️" title="Písanie" sub="Slovensky → píšeš španielsky" accent="t-coral"
              onClick={() => go("type")} />
            <Tile icon="💬" title="Frázy" sub="Cestovanie a konverzácia" accent="t-cobalt"
              onClick={() => go("phrases")} />
            <Tile icon="🧩" title="Skladanie viet" sub="Poukladaj slová do správneho poradia" accent="t-coral"
              onClick={() => go("build")} />
            <Tile icon="🔁" title="Slovesá" sub={level === 3 ? "Prítomný, pretérito, futuro, imperfecto" : "Časovanie — prítomný čas"} accent="t-saffron"
              onClick={() => go("verbs")} />
          </div>

          <p className="hint">Najefektívnejší postup: <strong>Lekcia</strong> na nové slová → na druhý deň <strong>Kartičky</strong> na zopakovanie. Slová, ktoré nevieš, sa vracajú častejšie.</p>
        </main>
      )}

      {screen.name === "dict" && (
        <Dictionary level={level} srs={data.srs} cardId={(es) => cardId(vPrefix, es)}
          onPractice={(cat) => go("flash", { cat })} onExit={() => go("home")} />
      )}
      {screen.name === "lesson" && (
        <Lesson key={"l" + level} level={level} srs={data.srs} cardId={(es) => cardId(vPrefix, es)}
          rate={rateCard} addXP={addXP} onExit={() => go("home")} />
      )}
      {screen.name === "flash" && (
        <FlashSession key={"f" + level + (screen.cat || "")}
          cards={buildSession("vocab", screen.cat)} rate={rateCard}
          onExit={() => go("home")} title={screen.cat ? `Kartičky — ${screen.cat}` : "Kartičky"} />
      )}
      {screen.name === "phrases" && (
        <FlashSession key={"p" + level} cards={buildSession("phrases")} rate={rateCard}
          onExit={() => go("home")} title="Frázy" />
      )}
      {screen.name === "quiz" && (
        <QuizSession key={"q" + level} level={level} addXP={addXP} sound={data.sound} onExit={() => go("home")} />
      )}
      {screen.name === "type" && (
        <TypeSession key={"t" + level} level={level} addXP={addXP} sound={data.sound} onExit={() => go("home")} />
      )}
      {screen.name === "verbs" && (
        <VerbSession key={"v" + level} level={level} addXP={addXP} onExit={() => go("home")} />
      )}
      {screen.name === "build" && (
        <BuildSession key={"b" + level} level={level} addXP={addXP} sound={data.sound} onExit={() => go("home")} />
      )}
      {screen.name === "account" && (
        <Account data={data} persist={persist} onExit={() => go("home")} />
      )}
    </div>
  );
}

/* ---------------- SLOVNÍK ---------------- */
function Dictionary({ level, srs, cardId, onPractice, onExit }) {
  const [open, setOpen] = useState(null);
  return (
    <main className="session">
      <div className="session-top">
        <button className="btn-back" onClick={onExit}>← Domov</button>
        <span className="session-title">Slovník — {["A1","A2","B1"][level-1]}</span>
      </div>
      <div className="dict-legend">
        <span><span className="kdot kdot-new">○</span> nové</span>
        <span><span className="kdot kdot-low">●</span> učím sa</span>
        <span><span className="kdot kdot-mid">●</span> opakujem</span>
        <span><span className="kdot kdot-high">●</span> viem</span>
      </div>
      {CATS[level].map((cat) => {
        const known = cat.words.filter(([es]) => (srs[cardId(es)]?.b ?? -1) >= 4).length;
        const isOpen = open === cat.name;
        return (
          <div key={cat.name} className="dict-cat">
            <button className="dict-cat-head" onClick={() => setOpen(isOpen ? null : cat.name)}
              aria-expanded={isOpen}>
              <span className="dict-cat-icon">{cat.icon}</span>
              <span className="dict-cat-name">{cat.name}</span>
              <span className="dict-cat-count">{known}/{cat.words.length}</span>
              <span className="dict-cat-chev">{isOpen ? "▾" : "▸"}</span>
            </button>
            {isOpen && (
              <div className="dict-words">
                {cat.words.map(([es, sk, ex]) => (
                  <div key={es} className="dict-row">
                    <KnowDot box={srs[cardId(es)]?.b} />
                    <div className="dict-word">
                      <div className="dict-es">{es} <SpeakBtn text={es} size="sm" /></div>
                      <div className="dict-sk">{sk}</div>
                      {ex && <div className="dict-ex">„{ex}“ <SpeakBtn text={ex} size="sm" /></div>}
                    </div>
                  </div>
                ))}
                <button className="btn-primary dict-practice" onClick={() => onPractice(cat.name)}>
                  Precvičiť túto tému 🃏
                </button>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}

/* ---------------- LEKCIA (intro → quiz → písanie) ---------------- */
function Lesson({ level, srs, cardId, rate, addXP, onExit }) {
  const [cat, setCat] = useState(null);
  const [phase, setPhase] = useState("pick"); // pick | intro | mc | type | done
  const [words, setWords] = useState([]);
  const [queue, setQueue] = useState([]);
  const [i, setI] = useState(0);
  const [mistakes, setMistakes] = useState({});
  const [picked, setPicked] = useState(null);
  const [val, setVal] = useState("");
  const [typeState, setTypeState] = useState(null);
  const inputRef = useRef(null);

  const catsWithNew = CATS[level].map((c) => ({
    ...c,
    unseen: c.words.filter(([es]) => !srs[cardId(es)]).length,
  }));

  const startCat = (c) => {
    const unseen = c.words.filter(([es]) => !srs[cardId(es)]);
    const pool = unseen.length >= 3 ? unseen : c.words;
    const chosen = shuffle(pool).slice(0, LESSON_SIZE).map(([es, sk, ex]) => ({ es, sk, ex, id: cardId(es) }));
    setCat(c);
    setWords(chosen);
    setQueue(chosen);
    setI(0);
    setPhase("intro");
    setTimeout(() => speak(chosen[0].es), 350);
  };

  /* ---- INTRO fáza ---- */
  if (phase === "pick") {
    return (
      <main className="session">
        <div className="session-top">
          <button className="btn-back" onClick={onExit}>← Domov</button>
          <span className="session-title">Lekcia — vyber tému</span>
        </div>
        <div className="lesson-cats">
          {catsWithNew.map((c) => (
            <button key={c.name} className="lesson-cat" onClick={() => startCat(c)}>
              <span className="dict-cat-icon">{c.icon}</span>
              <span className="dict-cat-name">{c.name}</span>
              <span className={`lesson-new ${c.unseen === 0 ? "done" : ""}`}>
                {c.unseen > 0 ? `${c.unseen} nových` : "✓ hotové"}
              </span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  const finishLesson = () => {
    for (const w of words) {
      const m = mistakes[w.id] || 0;
      rate(w.id, m === 0 ? 2 : m === 1 ? 1 : 0);
    }
    addXP(20);
    setPhase("done");
  };

  if (phase === "done") {
    const perfect = words.filter((w) => !(mistakes[w.id] > 0)).length;
    return (
      <Session title={`Lekcia — ${cat.name}`} onExit={onExit}>
        <Summary big={`${perfect} / ${words.length}`} onExit={onExit}
          lines={[["✅ Bez chyby", perfect], ["🟡 S chybou", words.length - perfect], ["⭐ Bonus XP", 20]]} />
      </Session>
    );
  }

  if (phase === "intro") {
    const w = words[i];
    const next = () => {
      if (i + 1 < words.length) {
        setI(i + 1);
        setTimeout(() => speak(words[i + 1].es), 250);
      } else {
        const withOptions = shuffle(words).map((x) => {
          const wrong = allWords(level).filter((y) => y.es !== x.es).map((y) => y.sk);
          return { ...x, options: shuffle([x.sk, ...shuffle([...new Set(wrong)]).slice(0, 3)]) };
        });
        setQueue(withOptions);
        setI(0);
        setPhase("mc");
      }
    };
    return (
      <Session title={`Nové slová — ${cat.name}`} onExit={onExit} progress={[i, words.length]}>
        <div className="intro-card">
          <div className="card-lang">nové slovo {i + 1}/{words.length}</div>
          <div className="intro-es">{w.es} <SpeakBtn text={w.es} /></div>
          <div className="intro-sk">{w.sk}</div>
          {w.ex && (
            <div className="intro-ex">
              <span>„{w.ex}“</span> <SpeakBtn text={w.ex} size="sm" />
            </div>
          )}
        </div>
        <button className="btn-primary btn-wide" onClick={next}>
          {i + 1 < words.length ? "Ďalšie slovo →" : "Idem na test →"}
        </button>
      </Session>
    );
  }

  /* ---- MC fáza ---- */
  if (phase === "mc") {
    const w = queue[i];
    const options = w.options;
    const pick = (opt) => {
      if (picked !== null) return;
      setPicked(opt);
      const ok = opt === w.sk;
      if (ok) addXP(8);
      else setMistakes((m) => ({ ...m, [w.id]: (m[w.id] || 0) + 1 }));
      setTimeout(() => {
        setPicked(null);
        if (i + 1 < queue.length) setI(i + 1);
        else { setQueue(shuffle(words)); setI(0); setPhase("type"); }
      }, ok ? 650 : 1500);
    };
    return (
      <Session title="Test 1/2 — spoznáš ich?" onExit={onExit} progress={[i, queue.length]}>
        <div className="q-prompt">
          <div className="q-label">Čo znamená:</div>
          <div className="q-word">{w.es} <SpeakBtn text={w.es} /></div>
        </div>
        <div className="q-options">
          {options.map((opt) => {
            let cls = "q-opt";
            if (picked !== null) {
              if (opt === w.sk) cls += " correct";
              else if (opt === picked) cls += " wrong";
              else cls += " dim";
            }
            return <button key={opt} className={cls} onClick={() => pick(opt)}>{opt}</button>;
          })}
        </div>
      </Session>
    );
  }

  /* ---- TYPE fáza ---- */
  const w = queue[i];
  const check = () => {
    if (typeState !== null) return;
    const u = norm(val), c = norm(w.es);
    const cNoArt = c.replace(/^(el|la|los|las) /, "");
    const uNoArt = u.replace(/^(el|la|los|las) /, "");
    if (u === c || uNoArt === cNoArt) {
      const exact = val.trim().toLowerCase() === w.es.toLowerCase();
      setTypeState(exact ? "ok" : "almost");
      addXP(exact ? 12 : 8);
      speak(w.es);
    } else {
      setTypeState("no");
      setMistakes((m) => ({ ...m, [w.id]: (m[w.id] || 0) + 1 }));
      speak(w.es);
    }
  };
  const next = () => {
    setVal(""); setTypeState(null);
    if (i + 1 < queue.length) setI(i + 1);
    else finishLesson();
  };
  return (
    <Session title="Test 2/2 — napíš ich" onExit={onExit} progress={[i, queue.length]}>
      <div className="q-prompt">
        <div className="q-label">Napíš španielsky:</div>
        <div className="q-word">{w.sk}</div>
      </div>
      <div className="type-row">
        <input ref={inputRef} className={`type-input ${typeState || ""}`} value={val} autoFocus
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (typeState === null ? check() : next())}
          placeholder="tvoja odpoveď…" disabled={typeState !== null}
          autoCapitalize="none" autoCorrect="off" spellCheck="false" />
        {typeState === null
          ? <button className="btn-primary" onClick={check} disabled={!val.trim()}>Skontrolovať</button>
          : <button className="btn-primary" onClick={next}>Ďalej →</button>}
      </div>
      {typeState === "ok" && <div className="fb fb-ok">✅ Presne tak: <strong>{w.es}</strong></div>}
      {typeState === "almost" && <div className="fb fb-almost">🟡 Správne — pozor na zápis: <strong>{w.es}</strong></div>}
      {typeState === "no" && <div className="fb fb-no">❌ Správne je: <strong>{w.es}</strong> — „{w.ex}“</div>}
    </Session>
  );
}

/* ---------------- KARTIČKY (SRS, s re-queue) ---------------- */
function FlashSession({ cards, rate, onExit, title }) {
  const [queue, setQueue] = useState(cards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({ again: 0, hard: 0, good: 0 });
  const done = i >= queue.length;

  if (cards.length === 0) {
    return (
      <Session title={title} onExit={onExit}>
        <div className="empty">Žiadne karty. Skús inú úroveň alebo tému.</div>
      </Session>
    );
  }

  if (done) {
    return (
      <Session title={title} onExit={onExit}>
        <Summary lines={[["✅ Viem", results.good], ["🟡 Ťažké", results.hard], ["🔁 Znova", results.again]]}
          onExit={onExit} />
      </Session>
    );
  }

  const card = queue[i];
  const grade = (g) => {
    rate(card.id, g);
    setResults((r) => ({
      again: r.again + (g === 0 ? 1 : 0),
      hard: r.hard + (g === 1 ? 1 : 0),
      good: r.good + (g === 2 ? 1 : 0),
    }));
    if (g === 0) setQueue((q) => [...q, { ...card, requeued: true }]); // vráti sa na koniec session
    setFlipped(false);
    setI(i + 1);
  };

  return (
    <Session title={title} onExit={onExit} progress={[i, queue.length]}>
      <button className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}
        aria-label="Otočiť kartu">
        <div className="card-lang">{flipped ? "slovensky" : "español"}{card.requeued ? " · opakovanie" : ""}</div>
        <div className="card-word">{flipped ? card.sk : card.es}</div>
        {!flipped && <SpeakBtn text={card.es} />}
        {flipped && card.ex && <div className="card-ex">„{card.ex}“</div>}
        <div className="card-tap">{flipped ? "" : "ťukni pre preklad"}</div>
      </button>
      {flipped ? (
        <div className="grade-row">
          <button className="g g-again" onClick={() => grade(0)}>🔁 Znova<small>ešte dnes</small></button>
          <button className="g g-hard" onClick={() => grade(1)}>🟡 Ťažké<small>~ 10 min</small></button>
          <button className="g g-good" onClick={() => grade(2)}>✅ Viem<small>neskôr</small></button>
        </div>
      ) : (
        <div className="grade-row placeholder">Najprv si tipni preklad, potom otoč kartu.</div>
      )}
    </Session>
  );
}

/* ---------------- QUIZ ---------------- */
function QuizSession({ level, addXP, sound, onExit }) {
  const questions = useMemo(() => {
    const pool = shuffle(allWords(level)).slice(0, 10);
    return pool.map((w) => {
      const dir = Math.random() < 0.5 ? "es-sk" : "sk-es";
      const correct = dir === "es-sk" ? w.sk : w.es;
      const wrongPool = allWords(level).filter((x) => x.es !== w.es)
        .map((x) => (dir === "es-sk" ? x.sk : x.es));
      const options = shuffle([correct, ...shuffle([...new Set(wrongPool)]).slice(0, 3)]);
      return { prompt: dir === "es-sk" ? w.es : w.sk, audio: dir === "es-sk" ? w.es : null,
               dirLabel: dir === "es-sk" ? "Čo znamená:" : "Ako sa povie:", correct, options };
    });
  }, [level]);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;

  if (done) {
    return (
      <Session title="Quiz" onExit={onExit}>
        <Summary lines={[["✅ Správne", score], ["❌ Nesprávne", questions.length - score]]}
          big={`${score} / ${questions.length}`} onExit={onExit} />
      </Session>
    );
  }

  const q = questions[i];
  const pick = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === q.correct) { setScore(score + 1); addXP(10); }
    if (sound) chime(opt === q.correct);
    setTimeout(() => { setPicked(null); setI(i + 1); }, opt === q.correct ? 700 : 1600);
  };

  return (
    <Session title="Quiz" onExit={onExit} progress={[i, questions.length]}>
      <div className="q-prompt">
        <div className="q-label">{q.dirLabel}</div>
        <div className="q-word">{q.prompt} {q.audio && <SpeakBtn text={q.audio} />}</div>
      </div>
      <div className="q-options">
        {q.options.map((opt) => {
          let cls = "q-opt";
          if (picked !== null) {
            if (opt === q.correct) cls += " correct";
            else if (opt === picked) cls += " wrong";
            else cls += " dim";
          }
          return <button key={opt} className={cls} onClick={() => pick(opt)}>{opt}</button>;
        })}
      </div>
    </Session>
  );
}

/* ---------------- PÍSANIE ---------------- */
function TypeSession({ level, addXP, sound, onExit }) {
  const questions = useMemo(() => shuffle(allWords(level)).slice(0, 8), [level]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const inputRef = useRef(null);
  const done = i >= questions.length;

  useEffect(() => { if (!done && state === null) inputRef.current?.focus(); }, [i, state, done]);

  if (done) {
    return (
      <Session title="Písanie" onExit={onExit}>
        <Summary lines={[["✅ Správne", score], ["❌ Nesprávne", questions.length - score]]}
          big={`${score} / ${questions.length}`} onExit={onExit} />
      </Session>
    );
  }

  const w = questions[i];
  const check = () => {
    if (state !== null) return;
    const u = norm(val), c = norm(w.es);
    const cNoArt = c.replace(/^(el|la|los|las) /, "");
    const uNoArt = u.replace(/^(el|la|los|las) /, "");
    if (u === c || uNoArt === cNoArt) {
      const exact = val.trim().toLowerCase() === w.es.toLowerCase();
      setState(exact ? "ok" : "almost");
      setScore(score + 1);
      addXP(exact ? 12 : 8);
      if (sound) chime(true);
      speak(w.es);
    } else {
      setState("no");
      if (sound) chime(false);
      speak(w.es);
    }
  };
  const next = () => { setVal(""); setState(null); setI(i + 1); };

  return (
    <Session title="Písanie" onExit={onExit} progress={[i, questions.length]}>
      <div className="q-prompt">
        <div className="q-label">Napíš španielsky:</div>
        <div className="q-word">{w.sk}</div>
      </div>
      <div className="type-row">
        <input ref={inputRef} className={`type-input ${state || ""}`} value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (state === null ? check() : next())}
          placeholder="tvoja odpoveď…" disabled={state !== null}
          autoCapitalize="none" autoCorrect="off" spellCheck="false" />
        {state === null
          ? <button className="btn-primary" onClick={check} disabled={!val.trim()}>Skontrolovať</button>
          : <button className="btn-primary" onClick={next}>Ďalej →</button>}
      </div>
      {state === "ok" && <div className="fb fb-ok">✅ Presne tak: <strong>{w.es}</strong></div>}
      {state === "almost" && <div className="fb fb-almost">🟡 Správne — pozor na zápis: <strong>{w.es}</strong></div>}
      {state === "no" && <div className="fb fb-no">❌ Správne je: <strong>{w.es}</strong>{w.ex ? <> — „{w.ex}“</> : null}</div>}
    </Session>
  );
}

/* ---------------- SLOVESÁ ---------------- */
function VerbSession({ level, addXP, onExit }) {
  const tenses = useMemo(() => {
    const t = [...new Set(VERBS.filter((v) => v.lvl <= level).map((v) => v.tense))];
    return level === 3 ? t : ["prítomný čas"];
  }, [level]);
  const [tense, setTense] = useState(null); // null = ešte nevybral (len ak >1 čas)
  const activeTense = tenses.length === 1 ? tenses[0] : tense;

  const questions = useMemo(() => {
    if (!activeTense) return [];
    const pool = VERBS.filter((v) => v.lvl <= level && v.tense === activeTense);
    return shuffle(pool).slice(0, 10).map((v) => {
      const pi = Math.floor(Math.random() * 6);
      return { verb: v, pi, answer: v.c[pi] };
    });
  }, [level, activeTense]);

  const [i, setI] = useState(0);
  const [val, setVal] = useState("");
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const inputRef = useRef(null);
  const done = activeTense && i >= questions.length;

  useEffect(() => { if (activeTense && !done && state === null) inputRef.current?.focus(); }, [i, state, done, activeTense]);

  // výber času (len ak je viac možností a ešte nevybral)
  if (!activeTense) {
    return (
      <Session title="Slovesá — vyber čas" onExit={onExit}>
        <div className="tense-pick">
          {tenses.map((t) => (
            <button key={t} className="tense-btn" onClick={() => { setTense(t); setI(0); }}>
              {t}
            </button>
          ))}
        </div>
      </Session>
    );
  }

  if (done) {
    return (
      <Session title="Slovesá" onExit={onExit}>
        <Summary lines={[["✅ Správne", score], ["❌ Nesprávne", questions.length - score]]}
          big={`${score} / ${questions.length}`} onExit={onExit} />
      </Session>
    );
  }

  const q = questions[i];
  const check = () => {
    if (state !== null) return;
    const ok = norm(val) === norm(q.answer);
    if (ok) {
      const exact = val.trim().toLowerCase() === q.answer;
      setState(exact ? "ok" : "almost");
      setScore(score + 1);
      addXP(exact ? 12 : 8);
    } else setState("no");
    speak(q.answer);
  };
  const next = () => { setVal(""); setState(null); setI(i + 1); };

  return (
    <Session title="Slovesá" onExit={onExit} progress={[i, questions.length]}>
      <div className="q-prompt">
        <div className="q-label">{q.verb.tense} · {q.verb.sk}</div>
        <div className="q-word">{q.verb.inf} <span className="q-pron">— {PRONOUNS[q.pi]}</span></div>
      </div>
      <div className="type-row">
        <input ref={inputRef} className={`type-input ${state || ""}`} value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (state === null ? check() : next())}
          placeholder="vyčasuj…" disabled={state !== null}
          autoCapitalize="none" autoCorrect="off" spellCheck="false" />
        {state === null
          ? <button className="btn-primary" onClick={check} disabled={!val.trim()}>Skontrolovať</button>
          : <button className="btn-primary" onClick={next}>Ďalej →</button>}
      </div>
      {state === "ok" && <div className="fb fb-ok">✅ <strong>{q.answer}</strong></div>}
      {state === "almost" && <div className="fb fb-almost">🟡 Správne — pozor na diakritiku: <strong>{q.answer}</strong></div>}
      {state === "no" && <div className="fb fb-no">❌ Správne je: <strong>{q.answer}</strong></div>}
      {state !== null && (
        <div className="conj-table">
          {PRONOUNS.map((p, idx) => (
            <div key={p} className={`conj-row ${idx === q.pi ? "hl" : ""}`}>
              <span>{p}</span><strong>{q.verb.c[idx]}</strong>
            </div>
          ))}
        </div>
      )}
    </Session>
  );
}

/* ---------------- DENNÝ CIEĽ + KALENDÁR ---------------- */
function DailyGoal({ data }) {
  const today = todayKey();
  const todayXP = (data.dayXP || {})[today] || 0;
  const goal = data.dailyGoal || 30;
  const pct = Math.min(todayXP / goal, 1);
  const reached = todayXP >= goal;

  // posledných 7 dní
  const days = [];
  for (let k = 6; k >= 0; k--) {
    const d = new Date(Date.now() - k * 864e5);
    const key = d.toISOString().slice(0, 10);
    const dow = ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"][d.getDay()];
    days.push({ key, dow, xp: (data.dayXP || {})[key] || 0, isToday: key === today });
  }

  const R = 26, C = 2 * Math.PI * R;
  const hour = new Date().getHours();
  const greet = hour < 10 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="daily">
      <div className="daily-top">
        <svg width="64" height="64" viewBox="0 0 64 64" className="ring">
          <circle cx="32" cy="32" r={R} fill="none" stroke="var(--line)" strokeWidth="6" />
          <circle cx="32" cy="32" r={R} fill="none" stroke={reached ? "var(--ok)" : "var(--cobalt)"}
            strokeWidth="6" strokeLinecap="round" strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)} transform="rotate(-90 32 32)" />
          <text x="32" y="37" textAnchor="middle" className="ring-txt">{reached ? "✓" : `${todayXP}`}</text>
        </svg>
        <div className="daily-info">
          <div className="daily-greet">{greet}{data.profile?.name ? `, ${data.profile.name}` : ""}!</div>
          <div className="daily-sub">
            {reached ? "Denný cieľ splnený 🎉" : `Dnes ${todayXP} / ${goal} XP — ešte ${goal - todayXP} do cieľa`}
          </div>
        </div>
      </div>
      <div className="streak-week">
        {days.map((d) => (
          <div key={d.key} className={`sd ${d.xp >= goal ? "done" : d.xp > 0 ? "partial" : ""} ${d.isToday ? "today" : ""}`}>
            <span className="sd-dot">{d.xp >= goal ? "🔥" : d.xp > 0 ? "•" : ""}</span>
            <span className="sd-lbl">{d.dow}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SKLADANIE VIET ---------------- */
function BuildSession({ level, addXP, sound, onExit }) {
  const questions = useMemo(() => {
    const pool = PHRASES[level].filter(([es]) => es.split(" ").length >= 3 && es.split(" ").length <= 7);
    const src = pool.length >= 5 ? pool : PHRASES[level];
    return shuffle(src).slice(0, 8).map(([es, sk]) => {
      const clean = es.replace(/[¿¡]/g, "");
      const tokens = clean.replace(/([?!.,])/g, "").split(" ").filter(Boolean);
      return { es, sk, tokens, scrambled: shuffle(tokens.map((t, idx) => ({ t, idx }))) };
    });
  }, [level]);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState([]);
  const [state, setState] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;

  if (done) {
    return (
      <Session title="Skladanie viet" onExit={onExit}>
        <Summary lines={[["✅ Správne", score], ["❌ Nesprávne", questions.length - score]]}
          big={`${score} / ${questions.length}`} onExit={onExit} />
      </Session>
    );
  }

  const q = questions[i];
  const remaining = q.scrambled.filter((s) => !picked.includes(s.idx));
  const addTok = (idx) => { if (state === null) setPicked([...picked, idx]); };
  const removeTok = (pos) => { if (state === null) setPicked(picked.filter((_, p) => p !== pos)); };

  const check = () => {
    const answer = picked.map((idx) => q.tokens[idx]).join(" ").toLowerCase();
    const correct = q.tokens.join(" ").toLowerCase();
    const ok = answer === correct;
    setState(ok ? "ok" : "no");
    if (ok) { setScore(score + 1); addXP(15); }
    if (sound) chime(ok);
    speak(q.es);
  };
  const next = () => { setPicked([]); setState(null); setI(i + 1); };

  return (
    <Session title="Skladanie viet" onExit={onExit} progress={[i, questions.length]}>
      <div className="q-prompt">
        <div className="q-label">Zostav vetu:</div>
        <div className="q-word build-sk">{q.sk}</div>
      </div>

      <div className={`build-slots ${state || ""}`}>
        {picked.length === 0 && <span className="build-ph">Ťukaj na slová nižšie…</span>}
        {picked.map((idx, pos) => (
          <button key={pos} className="tok tok-picked" onClick={() => removeTok(pos)}>
            {q.tokens[idx]}
          </button>
        ))}
      </div>

      <div className="build-bank">
        {remaining.map((s) => (
          <button key={s.idx} className="tok" onClick={() => addTok(s.idx)}>{s.t}</button>
        ))}
      </div>

      {state === null ? (
        <button className="btn-primary btn-wide" onClick={check} disabled={picked.length !== q.tokens.length}>
          Skontrolovať
        </button>
      ) : (
        <>
          {state === "ok"
            ? <div className="fb fb-ok">✅ Správne: <strong>{q.es}</strong></div>
            : <div className="fb fb-no">❌ Správne je: <strong>{q.es}</strong></div>}
          <button className="btn-primary btn-wide" onClick={next}>Ďalej →</button>
        </>
      )}
    </Session>
  );
}

/* ---------------- ÚČET ---------------- */
function Account({ data, persist, onExit }) {
  const [name, setName] = useState(data.profile?.name || "");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);

  const totalSeen = Object.keys(data.srs || {}).length;
  const known = Object.values(data.srs || {}).filter((s) => s.b >= 4).length;
  const activeDays = Object.keys(data.dayXP || {}).filter((k) => data.dayXP[k] > 0).length;

  const saveProfile = (patch) =>
    persist((d) => ({ ...d, profile: { ...d.profile, ...patch } }));

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vamos-progres-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed && typeof parsed === "object" && "srs" in parsed) {
          persist(() => ({ ...freshData(), ...parsed }));
          alert("Progres bol načítaný ✅");
        } else alert("Súbor nevyzerá ako platná záloha.");
      } catch { alert("Nepodarilo sa načítať súbor."); }
    };
    reader.readAsText(file);
  };

  const doReset = () => {
    persist(() => ({ ...freshData(), profile: { name, avatar: data.profile?.avatar || "🦉" } }));
    setConfirmReset(false);
  };

  return (
    <main className="session">
      <div className="session-top">
        <button className="btn-back" onClick={onExit}>← Domov</button>
        <span className="session-title">Účet</span>
      </div>

      <div className="acc-profile">
        <div className="acc-avatar">{data.profile?.avatar || "🦉"}</div>
        <input className="acc-name" value={name} placeholder="Tvoje meno"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => saveProfile({ name: name.trim() })}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          maxLength={20} />
      </div>

      <div className="acc-avatars">
        {AVATARS.map((a) => (
          <button key={a} className={`acc-av ${data.profile?.avatar === a ? "sel" : ""}`}
            onClick={() => saveProfile({ avatar: a })}>{a}</button>
        ))}
      </div>

      <div className="acc-stats">
        <div className="acc-stat"><strong>🔥 {data.streak}</strong><span>dní v rade</span></div>
        <div className="acc-stat"><strong>⭐ {data.xp}</strong><span>celkové XP</span></div>
        <div className="acc-stat"><strong>📚 {totalSeen}</strong><span>slov začatých</span></div>
        <div className="acc-stat"><strong>✅ {known}</strong><span>slov zvládnutých</span></div>
        <div className="acc-stat"><strong>📅 {activeDays}</strong><span>aktívnych dní</span></div>
        <div className="acc-stat"><strong>🎯 {data.dailyGoal}</strong><span>denný cieľ (XP)</span></div>
      </div>

      <div className="acc-section">
        <label className="acc-label">Denný cieľ</label>
        <div className="goal-row">
          {[20, 30, 50, 80].map((g) => (
            <button key={g} className={`goal-opt ${data.dailyGoal === g ? "sel" : ""}`}
              onClick={() => persist({ dailyGoal: g })}>{g} XP</button>
          ))}
        </div>
      </div>

      <div className="acc-section">
        <label className="acc-label">Zvuky</label>
        <button className={`toggle ${data.sound ? "on" : ""}`} onClick={() => persist({ sound: !data.sound })}>
          <span className="toggle-knob" />
          <span className="toggle-txt">{data.sound ? "Zapnuté" : "Vypnuté"}</span>
        </button>
      </div>

      <div className="acc-section">
        <label className="acc-label">Zálohovanie progresu</label>
        <p className="acc-hint">Dáta sú uložené len v tomto zariadení. Zálohu si prenesieš do iného telefónu/počítača cez export → import.</p>
        <div className="acc-actions">
          <button className="btn-soft" onClick={exportData}>⬇️ Exportovať zálohu</button>
          <button className="btn-soft" onClick={() => fileRef.current?.click()}>⬆️ Importovať zálohu</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={importData} />
        </div>
      </div>

      <div className="acc-section">
        <label className="acc-label danger-lbl">Nebezpečná zóna</label>
        {!confirmReset ? (
          <button className="btn-danger" onClick={() => setConfirmReset(true)}>Vymazať celý progres</button>
        ) : (
          <div className="confirm-box">
            <p>Naozaj vymazať všetko? Tento krok sa nedá vrátiť.</p>
            <div className="acc-actions">
              <button className="btn-soft" onClick={() => setConfirmReset(false)}>Zrušiť</button>
              <button className="btn-danger" onClick={doReset}>Áno, vymazať</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- SPOLOČNÉ ---------------- */
function Session({ title, onExit, progress, children }) {
  return (
    <main className="session">
      <div className="session-top">
        <button className="btn-back" onClick={onExit}>← Domov</button>
        <span className="session-title">{title}</span>
        {progress && <span className="session-count">{Math.min(progress[0] + 1, progress[1])}/{progress[1]}</span>}
      </div>
      {progress && <ProgressBar value={progress[0]} max={progress[1]} />}
      {children}
    </main>
  );
}

function Summary({ lines, big, onExit }) {
  return (
    <div className="summary">
      <Azulejo size={64} />
      <h2>¡Muy bien!</h2>
      {big && <div className="summary-big">{big}</div>}
      <div className="summary-lines">
        {lines.map(([label, n]) => (
          <div key={label} className="summary-line"><span>{label}</span><strong>{n}</strong></div>
        ))}
      </div>
      <button className="btn-primary" onClick={onExit}>Späť na menu</button>
    </div>
  );
}

/* ---------------- ŠTÝLY ---------------- */
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

      :root {
        --cobalt: #1E3F8F;
        --ink: #14203F;
        --saffron: #F5B92E;
        --coral: #D94F30;
        --paper: #F7F2E6;
        --paper-2: #FFFCF4;
        --line: #E3D9C2;
        --ok: #2E7D4F;
        --display: 'Fraunces', Georgia, serif;
        --body: 'Inter', system-ui, sans-serif;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { height: 100%; }
      body { background: var(--paper); }
      .app {
        min-height: 100vh; background: var(--paper); color: var(--ink);
        font-family: var(--body); max-width: 680px; margin: 0 auto;
        padding: 20px 18px 48px;
      }
      .loading { display:grid; place-items:center; min-height:60vh; font-size:1.1rem; }

      /* header */
      .hdr { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:22px; }
      .hdr-brand { display:flex; align-items:center; gap:12px; cursor:pointer; border:0; background:none; }
      .hdr h1 { font-family:var(--display); font-weight:700; font-size:1.7rem; line-height:1; color:var(--cobalt); }
      .hdr-sub { font-size:.78rem; color:#6B6452; letter-spacing:.04em; }
      .stats { display:flex; gap:8px; }
      .stat { background:var(--paper-2); border:1px solid var(--line); border-radius:999px;
              padding:6px 11px; font-size:.85rem; font-weight:600; white-space:nowrap; }
      .stat.due { background:var(--cobalt); color:#fff; border-color:var(--cobalt); }

      /* levels */
      .levels { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:14px; }
      .lvl { display:flex; flex-direction:column; gap:2px; padding:12px 10px; border-radius:14px;
             border:1.5px solid var(--line); background:var(--paper-2); cursor:pointer; font-family:var(--body); }
      .lvl strong { font-family:var(--display); font-size:1.25rem; color:var(--ink); }
      .lvl span { font-size:.74rem; color:#6B6452; }
      .lvl.active { border-color:var(--cobalt); background:var(--cobalt); }
      .lvl.active strong, .lvl.active span { color:#fff; }
      button:focus-visible { outline:3px solid var(--saffron); outline-offset:2px; }

      .lvl-progress { margin-bottom:20px; font-size:.82rem; color:#6B6452; display:flex; flex-direction:column; gap:6px; }
      .pbar { height:8px; border-radius:99px; background:var(--line); overflow:hidden; }
      .pbar-fill { height:100%; background:linear-gradient(90deg,var(--cobalt),var(--saffron)); transition:width .3s ease; }

      /* tiles */
      .tiles { display:flex; flex-direction:column; gap:10px; }
      .tile { display:flex; align-items:center; gap:14px; width:100%; text-align:left;
              padding:15px 16px; border-radius:16px; border:1.5px solid var(--line);
              background:var(--paper-2); cursor:pointer; transition:transform .12s ease, box-shadow .12s ease; }
      .tile:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(20,32,63,.10); }
      .tile-big { background:linear-gradient(135deg,#FBF0D4,#FFFCF4); border-color:var(--saffron); }
      .tile-icon { font-size:1.5rem; width:46px; height:46px; flex-shrink:0; display:grid; place-items:center;
                   border-radius:12px; background:var(--paper); border:1px solid var(--line); }
      .t-cobalt .tile-icon { background:#E8EDFA; border-color:#C9D4F0; }
      .t-saffron .tile-icon { background:#FBF0D4; border-color:#EDDCA6; }
      .t-coral .tile-icon { background:#F9E2DA; border-color:#EFC2B3; }
      .tile-title { font-family:var(--display); font-size:1.1rem; font-weight:700; }
      .tile-sub { font-size:.8rem; color:#6B6452; margin-top:1px; }
      .tile-arrow { margin-left:auto; color:var(--cobalt); font-weight:700; }
      .hint { margin-top:18px; font-size:.82rem; color:#6B6452; line-height:1.5; }

      /* speak */
      .speak { border:0; background:none; cursor:pointer; font-size:1.1rem; line-height:1;
               padding:4px; border-radius:8px; }
      .speak.sm { font-size:.85rem; }
      .speak:hover { background:rgba(30,63,143,.1); }

      /* session */
      .session { display:flex; flex-direction:column; gap:16px; }
      .session-top { display:flex; align-items:center; gap:12px; }
      .btn-back { border:1px solid var(--line); background:var(--paper-2); border-radius:10px;
                  padding:7px 12px; cursor:pointer; font-weight:600; font-size:.85rem; color:var(--ink); }
      .session-title { font-family:var(--display); font-weight:700; font-size:1.02rem; }
      .session-count { margin-left:auto; font-size:.85rem; color:#6B6452; font-variant-numeric:tabular-nums; }

      /* dictionary */
      .dict-legend { display:flex; gap:14px; flex-wrap:wrap; font-size:.78rem; color:#6B6452; }
      .kdot { font-size:.9rem; margin-right:3px; }
      .kdot-new { color:#B7AE94; }
      .kdot-low { color:var(--coral); }
      .kdot-mid { color:#C99A1F; }
      .kdot-high { color:var(--ok); }
      .dict-cat { border:1.5px solid var(--line); border-radius:14px; background:var(--paper-2); overflow:hidden; }
      .dict-cat-head { display:flex; align-items:center; gap:10px; width:100%; padding:13px 14px;
                       border:0; background:none; cursor:pointer; font-family:var(--body); font-size:.95rem; }
      .dict-cat-icon { font-size:1.2rem; }
      .dict-cat-name { font-weight:700; color:var(--ink); text-align:left; }
      .dict-cat-count { margin-left:auto; font-size:.8rem; color:#6B6452; font-variant-numeric:tabular-nums; }
      .dict-cat-chev { color:#9A9176; }
      .dict-words { border-top:1px solid var(--line); padding:6px 14px 14px; display:flex; flex-direction:column; gap:2px; }
      .dict-row { display:flex; gap:10px; align-items:flex-start; padding:9px 0; }
      .dict-row + .dict-row { border-top:1px dashed var(--line); }
      .dict-es { font-weight:700; font-size:1rem; }
      .dict-sk { font-size:.88rem; color:#5A5443; }
      .dict-ex { font-size:.8rem; color:#8A8268; font-style:italic; margin-top:2px; }
      .dict-practice { margin-top:10px; }

      /* lesson */
      .lesson-cats { display:flex; flex-direction:column; gap:8px; }
      .lesson-cat { display:flex; align-items:center; gap:10px; padding:13px 14px; border-radius:14px;
                    border:1.5px solid var(--line); background:var(--paper-2); cursor:pointer;
                    font-family:var(--body); font-size:.95rem; }
      .lesson-cat:hover { border-color:var(--cobalt); }
      .lesson-new { margin-left:auto; font-size:.78rem; font-weight:700; color:var(--coral);
                    background:#F9E2DA; padding:3px 9px; border-radius:99px; white-space:nowrap; }
      .lesson-new.done { color:var(--ok); background:#DFF0E5; }
      .intro-card { display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center;
                    padding:34px 22px; border-radius:20px; border:1.5px solid var(--saffron);
                    background:linear-gradient(160deg,#FBF0D4,#FFFCF4); box-shadow:0 4px 0 #EDDCA6; }
      .intro-es { font-family:var(--display); font-size:2.1rem; font-weight:700; color:var(--cobalt);
                  display:flex; align-items:center; gap:8px; }
      .intro-sk { font-size:1.15rem; font-weight:600; }
      .intro-ex { font-size:.92rem; color:#6B6452; font-style:italic; display:flex; align-items:center; gap:4px;
                  margin-top:6px; }
      .btn-wide { width:100%; }

      /* flashcard */
      .card { width:100%; min-height:230px; border-radius:20px; border:1.5px solid var(--line);
              background:var(--paper-2); cursor:pointer; display:flex; flex-direction:column;
              align-items:center; justify-content:center; gap:10px; padding:24px;
              box-shadow:0 4px 0 var(--line); transition:transform .12s ease; }
      .card:active { transform:scale(.99); }
      .card.flipped { background:var(--cobalt); border-color:var(--cobalt); box-shadow:0 4px 0 #15295E; }
      .card-lang { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:#9A9176; }
      .card.flipped .card-lang { color:#B9C6E8; }
      .card-word { font-family:var(--display); font-size:2rem; font-weight:700; text-align:center; line-height:1.2; }
      .card.flipped .card-word { color:#fff; }
      .card-ex { font-size:.88rem; color:#C8D2EC; font-style:italic; text-align:center; }
      .card-tap { font-size:.78rem; color:#9A9176; min-height:1em; }
      .card .speak { font-size:1.3rem; }

      .grade-row { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; min-height:64px; }
      .grade-row.placeholder { display:grid; place-items:center; grid-template-columns:1fr;
                               color:#9A9176; font-size:.85rem; border:1.5px dashed var(--line); border-radius:14px; }
      .g { display:flex; flex-direction:column; gap:2px; align-items:center; padding:12px 8px;
           border-radius:14px; border:0; cursor:pointer; font-weight:700; font-size:.95rem; color:#fff; }
      .g small { font-weight:500; font-size:.7rem; opacity:.85; }
      .g-again { background:var(--coral); }
      .g-hard { background:#C99A1F; }
      .g-good { background:var(--ok); }
      .g:hover { filter:brightness(1.07); }

      /* quiz */
      .q-prompt { text-align:center; padding:18px 0 4px; }
      .q-label { font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; color:#9A9176; margin-bottom:8px; }
      .q-word { font-family:var(--display); font-size:1.9rem; font-weight:700; display:flex;
                align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
      .q-pron { color:var(--coral); font-size:1.3rem; }
      .q-options { display:grid; gap:10px; }
      .q-opt { padding:14px 16px; border-radius:14px; border:1.5px solid var(--line);
               background:var(--paper-2); cursor:pointer; font-size:1rem; font-weight:600;
               text-align:left; color:var(--ink); transition:all .12s ease; }
      .q-opt:hover { border-color:var(--cobalt); }
      .q-opt.correct { background:var(--ok); border-color:var(--ok); color:#fff; }
      .q-opt.wrong { background:var(--coral); border-color:var(--coral); color:#fff; }
      .q-opt.dim { opacity:.45; }

      /* typing */
      .type-row { display:flex; gap:10px; }
      .type-input { flex:1; min-width:0; padding:14px 16px; border-radius:14px; border:1.5px solid var(--line);
                    background:var(--paper-2); font-size:1.05rem; font-family:var(--body); color:var(--ink); }
      .type-input.ok { border-color:var(--ok); }
      .type-input.almost { border-color:#C99A1F; }
      .type-input.no { border-color:var(--coral); }
      .btn-primary { padding:13px 20px; border-radius:14px; border:0; background:var(--cobalt);
                     color:#fff; font-weight:700; font-size:.95rem; cursor:pointer; }
      .btn-primary:disabled { opacity:.5; cursor:default; }
      .btn-primary:not(:disabled):hover { filter:brightness(1.1); }
      .fb { padding:13px 16px; border-radius:14px; font-size:.95rem; }
      .fb-ok { background:#DFF0E5; color:var(--ok); }
      .fb-almost { background:#FBF0D4; color:#8A6A10; }
      .fb-no { background:#F9E2DA; color:#A33A20; }

      /* conjugation table */
      .conj-table { border:1.5px solid var(--line); border-radius:14px; overflow:hidden; background:var(--paper-2); }
      .conj-row { display:flex; justify-content:space-between; padding:9px 16px; font-size:.92rem; }
      .conj-row + .conj-row { border-top:1px solid var(--line); }
      .conj-row.hl { background:#E8EDFA; }
      .conj-row span { color:#6B6452; }

      /* summary */
      .summary { display:flex; flex-direction:column; align-items:center; gap:14px; padding:32px 0; text-align:center; }
      .summary h2 { font-family:var(--display); font-size:1.8rem; color:var(--cobalt); }
      .summary-big { font-family:var(--display); font-size:2.6rem; font-weight:700; }
      .summary-lines { width:100%; max-width:300px; display:flex; flex-direction:column; gap:6px; }
      .summary-line { display:flex; justify-content:space-between; padding:9px 14px;
                      background:var(--paper-2); border:1px solid var(--line); border-radius:10px; font-size:.92rem; }
      .empty { text-align:center; color:#6B6452; padding:40px 0; }

      /* avatar button */
      .avatar-btn { cursor:pointer; font-size:1rem; line-height:1; padding:5px 9px; }
      .avatar-btn:hover { border-color:var(--cobalt); }

      /* denný cieľ */
      .daily { background:var(--paper-2); border:1.5px solid var(--line); border-radius:18px;
               padding:16px; margin-bottom:18px; }
      .daily-top { display:flex; align-items:center; gap:14px; }
      .ring-txt { font-family:var(--display); font-weight:700; font-size:15px; fill:var(--ink); }
      .daily-greet { font-family:var(--display); font-size:1.2rem; font-weight:700; color:var(--cobalt); }
      .daily-sub { font-size:.84rem; color:#6B6452; margin-top:2px; }
      .streak-week { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; margin-top:14px; }
      .sd { display:flex; flex-direction:column; align-items:center; gap:3px; padding:7px 0;
            border-radius:10px; background:var(--paper); border:1px solid var(--line); }
      .sd-dot { font-size:.85rem; height:1.1em; }
      .sd-lbl { font-size:.66rem; color:#9A9176; }
      .sd.partial { background:#FBF0D4; border-color:#EDDCA6; }
      .sd.done { background:#DFF0E5; border-color:#B6DCC4; }
      .sd.today { outline:2px solid var(--cobalt); outline-offset:-1px; }

      /* tense picker */
      .tense-pick { display:flex; flex-direction:column; gap:10px; padding-top:8px; }
      .tense-btn { padding:16px; border-radius:14px; border:1.5px solid var(--line); background:var(--paper-2);
                   font-family:var(--display); font-size:1.1rem; font-weight:700; color:var(--ink); cursor:pointer; }
      .tense-btn:hover { border-color:var(--cobalt); background:#E8EDFA; }

      /* skladanie viet */
      .build-sk { font-size:1.5rem; }
      .build-slots { min-height:64px; display:flex; flex-wrap:wrap; gap:8px; align-items:center;
                     padding:14px; border-radius:14px; border:1.5px dashed var(--line); background:var(--paper-2); }
      .build-slots.ok { border-style:solid; border-color:var(--ok); background:#DFF0E5; }
      .build-slots.no { border-style:solid; border-color:var(--coral); background:#F9E2DA; }
      .build-ph { color:#9A9176; font-size:.85rem; }
      .build-bank { display:flex; flex-wrap:wrap; gap:8px; min-height:48px; }
      .tok { padding:10px 14px; border-radius:12px; border:1.5px solid var(--line); background:var(--paper-2);
             font-size:1rem; font-weight:600; color:var(--ink); cursor:pointer; font-family:var(--body); }
      .tok:hover { border-color:var(--cobalt); }
      .tok-picked { background:var(--cobalt); color:#fff; border-color:var(--cobalt); }

      /* účet */
      .acc-profile { display:flex; align-items:center; gap:14px; }
      .acc-avatar { font-size:2.4rem; width:64px; height:64px; display:grid; place-items:center;
                    border-radius:18px; background:var(--paper-2); border:1.5px solid var(--line); }
      .acc-name { flex:1; min-width:0; padding:12px 14px; border-radius:12px; border:1.5px solid var(--line);
                  background:var(--paper-2); font-size:1.1rem; font-family:var(--display); font-weight:700; color:var(--ink); }
      .acc-avatars { display:flex; flex-wrap:wrap; gap:8px; }
      .acc-av { font-size:1.4rem; width:46px; height:46px; border-radius:12px; border:1.5px solid var(--line);
                background:var(--paper-2); cursor:pointer; }
      .acc-av.sel { border-color:var(--cobalt); background:#E8EDFA; transform:scale(1.05); }
      .acc-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
      .acc-stat { background:var(--paper-2); border:1px solid var(--line); border-radius:12px;
                  padding:12px 8px; text-align:center; display:flex; flex-direction:column; gap:2px; }
      .acc-stat strong { font-family:var(--display); font-size:1.1rem; }
      .acc-stat span { font-size:.7rem; color:#6B6452; }
      .acc-section { display:flex; flex-direction:column; gap:8px; }
      .acc-label { font-family:var(--display); font-weight:700; font-size:1rem; color:var(--ink); }
      .acc-hint { font-size:.78rem; color:#6B6452; line-height:1.5; }
      .goal-row, .acc-actions { display:flex; gap:8px; flex-wrap:wrap; }
      .goal-opt { flex:1; min-width:64px; padding:11px; border-radius:12px; border:1.5px solid var(--line);
                  background:var(--paper-2); font-weight:700; cursor:pointer; color:var(--ink); }
      .goal-opt.sel { border-color:var(--cobalt); background:var(--cobalt); color:#fff; }
      .toggle { display:inline-flex; align-items:center; gap:10px; padding:7px 14px 7px 7px; border-radius:99px;
                border:1.5px solid var(--line); background:var(--paper-2); cursor:pointer; align-self:flex-start; }
      .toggle-knob { width:22px; height:22px; border-radius:50%; background:#C4BCA6; transition:all .15s ease; }
      .toggle.on { border-color:var(--ok); }
      .toggle.on .toggle-knob { background:var(--ok); transform:translateX(4px); }
      .toggle-txt { font-weight:600; font-size:.9rem; }
      .btn-soft { flex:1; min-width:140px; padding:12px; border-radius:12px; border:1.5px solid var(--line);
                  background:var(--paper-2); font-weight:700; cursor:pointer; color:var(--ink); }
      .btn-soft:hover { border-color:var(--cobalt); }
      .danger-lbl { color:var(--coral); }
      .btn-danger { padding:12px 16px; border-radius:12px; border:1.5px solid var(--coral);
                    background:#F9E2DA; color:#A33A20; font-weight:700; cursor:pointer; }
      .confirm-box { background:#F9E2DA; border:1.5px solid var(--coral); border-radius:14px; padding:14px;
                     font-size:.9rem; color:#A33A20; display:flex; flex-direction:column; gap:10px; }

      @media (max-width: 460px) {
        .hdr h1 { font-size:1.4rem; }
        .stats { flex-wrap:wrap; justify-content:flex-end; }
        .card-word { font-size:1.6rem; }
        .q-word { font-size:1.5rem; }
        .intro-es { font-size:1.7rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        * { transition:none !important; }
      }
    `}</style>
  );
}
