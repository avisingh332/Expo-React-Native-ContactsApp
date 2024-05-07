import * as SQLite from 'expo-sqlite';
import { deleteImage } from '../utility/SaveImageLocally';

// Singleton pattern to get a single instance of the database
export const DatabaseInstance = (() => {
    let instance = null;

    return {
        getInstance: () => {
            if (!instance) {
                instance = SQLite.openDatabase("contactAppDB.db");
            }
            return instance;
        },
    };
})();

export const connectToDb = (): SQLite.SQLiteDatabase => {
    try {
        const db = SQLite.openDatabase("contactAppDB.db");
        return db;
    } catch (error) {
        console.log("Error Connecting to Database......");
        console.log(error);
        throw Error("Failed to connect to database")
    }
}

export const dropTable = async () => {

    const query = `
    DROP TABLE IF EXISTS contacts;
    `;
    try {
        const db = await connectToDb();
        await db.transactionAsync(async (tx) => {
            await tx.executeSqlAsync(query, []);
            console.log("Deleted Table Successfully")
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const createTables = async () => {

    const contactQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phoneNumber TEXT,
            email TEXT,
            favorite INTEGER DEFAULT 0,
            imageUri TEXT
        );
    `
    try {
        const db = DatabaseInstance.getInstance();
        await db.transactionAsync(async (tx) => {
            await tx.executeSqlAsync(contactQuery, []);
            console.log("Table Created successfully");
        })

    } catch (error) {
        console.error(error)
        throw Error(`Failed to create tables`)
    }
}

export const getContacts = (): Promise<any[]> => {
    try {
        return new Promise((resolve, reject) => {
            const db = DatabaseInstance.getInstance();
            db.transaction(tx => {
                tx.executeSql('Select * from contacts', [],
                    (txObj, res) => {
                        // console.log("Result in the getContacts Meathod......");
                        // console.log(res.rows._array);
                        resolve(res.rows._array);

                    },
                    (txObj, error) => {
                        reject(error);
                    }
                )
            })
        })

    } catch (error) {
        console.error(error)
        throw Error("Failed to get Contacts from database")
    }
}

export const upsertContact = async (values) => {
    // Insert query with placeholders for dynamic values
    console.log(values);

    const insertQuery = `
        INSERT INTO contacts(name, email, phoneNumber, favorite, imageUri) 
        VALUES (?, ?, ?,?,?)
    `;
    const updateQuery = `
        UPDATE contacts
        SET
        name =?,
        email =?,
        phoneNumber =?,
        favorite =?,
        ImageUri =?
        WHERE id =?
    `;
    try {
        // Execute the transaction to insert the new contact
        const db = DatabaseInstance.getInstance();

        await db.transactionAsync(async (tx) => {
            const result = await tx.executeSqlAsync(values.isUpdateRequest?updateQuery:insertQuery, 
                [values.name, values.email, values.phoneNumber,values.favorite, values.imageUri,values.id]);
            // console.log({result});
        });

    } catch (error) {
        console.log(error);
        throw Error(`Failed to Add Contact`)
    }
};

export async function updateContact(values) {
    const query = `
        UPDATE contacts
        SET
        name =?,
        phoneNumber =?,
        email =?,
        favorite =?,
        ImageUri =?
    `;
    try {
        // Execute the transaction to insert the new contact
        const db = DatabaseInstance.getInstance();

        await db.transactionAsync(async (tx) => {
            const result = await tx.executeSqlAsync(query, [values.email, values.name, values.phoneNumber, values.imageUri]);
            // console.log({result});
        });

    } catch (error) {
        console.log(error);
        throw Error(`Failed to Add Contact`)
    }
}
export const listTables = async () => {

    const query = `
      SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name
    `;

    try {
        // await db.transactionAsync(async(tx)=>{
        //     const resultSet = await tx.executeSqlAsync( query, []);
        //     console.log(resultSet.rows);
        //     console.log("Success.....");
        // })
        const db = DatabaseInstance.getInstance();
        await db.transactionAsync(async (tx) => {
            const result = await tx.executeSqlAsync(
                query,
                [],
            );
            console.log(result.rows);
        })
        // db.transaction((tx) => {
        //     tx.executeSql(
        //     query,
        //     [], // You should use an empty array instead of `null` for parameters
        //     (txObj, resultSet) => {
        //         console.log("Table Names:", resultSet.rows._array);
        //         console.log("Success");
        //     },
        //     (txObj, error) => {
        //         console.error("Error retrieving table names:", error);
        //         return false;
        //     }
        //     );
        // });
    } catch (error) {
        console.error("Transaction failed:", error);
    }
};

export const getColumns = async () => {
    const query = `
    SELECT sql FROM sqlite_master
    WHERE tbl_name = 'contacts' AND type = 'table'
    `;
    try {
        const db = await connectToDb()
        db.transaction(tx => {
            tx.executeSql(query, null,
                (txObj, resultSet) => console.log(resultSet.rows._array),
                (txObj, error) => { console.log(error); return true; }
            )
        })
    } catch (error) {
        console.log(error);
    }
}