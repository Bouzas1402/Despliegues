## Sesión demostración de casos de uso de ssh

1. Arranque del pool ssh
```
docker compose -f docker-compose-ssh.yml up -d
```

2. Abrir una conexión de terminal a cada servicio
```
docker exec -it ``cliente-ssh`` bash
docker exec -it `servidor-ssh` bash
```

### Autorizar al usuario `root` de cliente acceso sin contraseña como usuario `admin` en el servidor

3. Desde ``cliente-ssh``
Generar clave pública y privada del usuario root (contestar a todas las preguntas con un intro):
```
ssh-keygen
ssh-copy-id admin@172.29.0.2
```
Probar funcionamiento adecuado (debe acceder sin necesidad de introducir contraseña):
```
ssh admin@172.29.0.2
```

### Montar por sshfs un directorio del servidor en el cliente

4. Desde `servidor-ssh`
Convertirse en usuario admin y crear un directorio `html`:
```
sudo su - admin
mkdir html
```
5. Desde `cliente-ssh`
Crear directorio `/var/www/html` y montar el directorio
```
mkdir -p /var/www/html
sshfs admin@172.29.0.2:/home/admin/html /var/www/html
```
6. Comprobar que efectivamente está montado con estos dos comandos:
```
df -k
mount
```
7. Crear un fichero en `cliente-ssh`
```
cd /var/www/html
touch index.html
```
8. En `servidor-ssh` comprobar que en el directorio `html` está el fichero creado

### Probar opciones de sincronización con herramienta rsync

9. En `cliente-ssh` desmontar el punto de montaje creado en el paso 5
```
umount /var/www/html
```
Comprobar que está desmontado ejecutando los comandos del paso 6

Crear archivo en `cliente-ssh` en directorio /var/www/html
```
cd /var/www/html
touch index.html
```
Comprobar la hora de creación de los respectivos index.html en cliente y servidor
```
ls -la
```

10. Sincronizar contenido con directorio servidor
```
rsync -avze ssh /var/www/html/ admin@172.29.0.2:/home/admin/html/
```
En servidor comprobar cómo la hora del archivo `index.html` ha cambiado

Añadir otro archivo en `cliente-ssh` y ejecutar de nuevo comando anterior. 
```
touch index2.html
```
Comprobar cómo afecta al contenido en el servidor.

11. Sincronizar con borrado en destino
Borrar en `cliente-ssh` el fichero `index2.html`
Ejecutar de nuevo el rsync anterior y comprobar que el contenido destino no ha cambiado.
Ahora ejecutar el siguiente comando en `cliente-ssh`:
```
rsync -avze ssh --delete /var/www/html/ admin@172.29.0.2:/home/admin/html/
```
Comprobar que en el `servidor-ssh` hay exactamente lo mismo que en el `cliente-ssh`
