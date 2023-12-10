# Teslo shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

* El -d, significa __detached__
* Nota: no olvidarse de crear el archivo .env y definir la ruta de la base de datos para conectar


# Para conectarse a la base de datos se utiliza el siguiente comando (revisar el puerto utilizado en la base de datos)
* mongodb://localhost:27020/product-nestjs

# Modelos en mongoose:

```
Un modelos es una nueva base de datos dentro de la base de datos. Para crear una modelo se puede tomar 
como ejemplo el modelo de user y crear el resto de modelos
```

# Sitios de investigación

```
https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist
https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
```

# Documentación del proyecto

```
 * Al ir a prod, se debe cambiar el url en el archivo environment de localhost porel del server (probar un servicio como listar subs 
para aseguranos que el url está capturando los servicios)
 * Al momento de crear los planes se debe primero disparar al servicio de paypal una vez se ha creado el plan desde paypal
 el id que retorna paypal se debe guardar en el archivo de constantes que tiene todos los id de los planes.

```
