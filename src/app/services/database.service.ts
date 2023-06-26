import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database!: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'my_database.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.createTable();
      }).catch(error => {
        console.error('Error al abrir la base de datos', error);
      });
    });
  }

  private createTable() {
    const query = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)';
    this.database.executeSql(query, [])
      .then(() => {
        console.log('Tabla "usuarios" creada correctamente');
      })
      .catch(error => {
        console.error('Error al crear la tabla "usuarios"', error);
      });
  }

  public getUserByEmail(email: string): Promise<any> {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    return this.database.executeSql(query, [email])
      .then(data => {
        if (data.rows.length > 0) {
          return data.rows.item(0);
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error al obtener el usuario', error);
        return null;
      });
  }

  public createUser(email: string, password: string): Promise<any> {
    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
    return this.database.executeSql(query, [email, password])
      .then(() => {
        console.log('Usuario creado correctamente');
      })
      .catch(error => {
        console.error('Error al crear el usuario', error);
      });
  }
}