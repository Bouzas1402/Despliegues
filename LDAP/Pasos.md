## PAsos Ldap

1. Lanzamos el docker-compose docker-compose up -d
2. Creamos un archivo de conf de apache en sites-availabre:
```
<VirtualHost *:80>

        ServerName carlosbouzas.es

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        ErrorLog ${APACHE_LOG_DIR}/carlosbouzas.es-error.log
        CustomLog ${APACHE_LOG_DIR}/carlosbouzas.es-access.log combined

</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```
3. Activamos el virtualhost y creado las capetas y los ficheros (/var/wwww/html(index.html)/zonaprivada(index.html))
```
touch carlosbouzas.es.conf
a2ensite carlosbouzas.es.conf
a2dissite 000-default.conf
``` 
4. Añadimos estas lineas al archivo /etc/apache2/apache2.conf
```
<Location /zonaprivada>
     	AuthName "LDAP Authentication"
     	AuthType Basic
		AuthBasicProvider ldap
		AuthLDAPURL ldap://ldap-server/dc=carlosgs,dc=es
		Require ldap-group cn=Operaciones,ou=Groups,dc=carlosgs,dc=es
</Location>
```
5. Y esta al fichero /etc/hosts
```
172.21.0.3      carlosbouzas.es
```
6. Reiniciamos el servicio
```
service apache2 reload (o restart)
```
Deberia funcionar