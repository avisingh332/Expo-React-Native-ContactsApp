import * as SQLite from 'expo-sqlite';

export const connectToDb = async() =>{
    try{
        const db = SQLite.openDatabase("contactAppDB.db");
        console.log("Database Connected Successfully");
        return db;
    }catch(error){
        throw Error("Failed to connect to database")
    }
}
export const dropTable = async(db:SQLite.SQLiteDatabase) =>{
    const query =`
    DROP TABLE IF EXISTS contacts;
    `;
    try{
        db.transaction(tx=>{
            tx.executeSql(query,null,
                (txObj,resultSet) => console.log("Deleted Table Successfully"),
                (txObj, error) => {console.log(error); return true} ,
            );
        });
    }
    catch(error){
        console.log(error);
    }
}
export const createTables = async(db:SQLite.SQLiteDatabase) => {
    const contactQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        PhoneNumber TEXT,
        Email TEXT
    );
    `;
    try{
       db.transaction(tx=>{
        tx.executeSql(contactQuery,null,
            (txObj,resultSet)=> console.log("Created Table Successfully"),
            (txObj,error)=> {console.log(error); return true;}
        )
       });
       
    }catch(error){
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

export const getContacts = async (db: SQLite.SQLiteDatabase):Promise<any[]> => {
    try {
        
       return new Promise((resolve, reject)=>{
        db.transaction(tx=>{
            tx.executeSql('Select * from contacts', null,
                (txObj,resultSet)=> {
                    console.log(resultSet.rows._array);
                    var result= resultSet.rows._array;
                    resolve(result);
                },
                (txObj,error)=> {console.log(error); return true;}
            );
        })
       })
    } catch (error) {
        console.error(error)
        throw Error("Failed to get Contacts from database")
    }
}
export const addContact = async (db: SQLite.SQLiteDatabase, values) => {
    // Insert query with placeholders for dynamic values
    const query = `
        INSERT INTO contacts(Email, Name, PhoneNumber) 
        VALUES (?, ?, ?)
    `;

    // Execute the transaction to insert the new contact
    db.transaction(tx => {
        tx.executeSql(query, [values.email, values.name, values.phoneNumber], 
            (tx, result) => {
                console.log("Contact inserted successfully");
            },
            (tx, error) => {
                console.error("Error inserting contact", error);
                return false; // Return false to indicate error
            }
        );
    });
};

export const listTables = async(db: SQLite.SQLiteDatabase)=>{
    const query = `
    SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name
    `
    db.transaction(tx =>{
        tx.executeSql(query, null, 
            (txObj, resultSet)=>console.log(resultSet.rows._array),
            (txOjb, error)=>{console.log(error); return true;},
        )
    });
}

export const getColumns = async(db:SQLite.SQLiteDatabase) =>{
    const query = `
    SELECT sql FROM sqlite_master
    WHERE tbl_name = 'contacts' AND type = 'table'
    `
    db.transaction(tx=>{
        tx.executeSql(query,null,
        (txObj,resultSet)=> console.log(resultSet.rows._array),
        (txObj,error)=> {console.log(error); return true;}
        )
    })
}