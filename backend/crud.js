//MongoDB client
const { MongoClient } = require("mongodb");

//Connection string
require("dotenv").config();
const { MONGO_URI, MONGO_DB } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* ************************ CREATE/ADD DATA TO COLLECTION ************************
 * Expects collection name and Array or Object with values to create.
 *    Returns response {
 *      status: 201, 500, 404
 *      error:  false, true
 *      message: description of what happened
 *      data: <Data passed to be created>
 *      *inserted: Results from MongoDB     *onSuccess only
 *    }
 */
const createDBdata = async (collName, newData) => {
  //create mongo client
  const client = new MongoClient(MONGO_URI, options);
  //init response
  const response = {};

  try {
    //connect to client
    await client.connect();

    //connect to db
    const myDB = client.db(MONGO_DB);
    //console.log("Connected");

    //Init results
    let results;

    //Validate data before creating
    if (typeof newData !== "object") {
      //DATA ERROR new Data is not an object (includes arrays)
      response.status = 404;
      response.error = true;
      response.message = "Data must be an object or an array.";
      response.data = newData;
    } else {
      //newData is Object (single) or Array (multiple)?
      if (Array.isArray(newData)) {
        results = await myDB.collection(collName).insertMany(newData); //CREATE
      } else {
        results = await myDB.collection(collName).insertOne(newData); //CREATE
      }

      //SUCCESS Response
      response.status = 201;
      response.error = false;
      response.message = "Data created.";
      response.inserted = results;
      response.data = newData;
    }
  } catch (err) {
    //Internal ERROR
    response.status = 500;
    response.error = true;
    response.message = err.message;
    response.data = null;
  } finally {
    //disconnect from client
    client.close();
    //console.log("Disconnected.");
    return response;
  }
};

/* ************************ READ/GET DATA FROM COLLECTION ************************
 * Expects collection mame. OPTIONAL {  limit: <max results>, start: <start search @>,
 *  filter: < "_id" string OR object containing fields and conditions to use as filter criteria> }
 *  *    Returns response {
 *      status: 200, 500, 404
 *      error:  false, true
 *      message: description of what happened
 *      start: <start position of search>
 *      limit: <max results to return>
 *      total: <amt of results found>
 *      filter: <_id or other filter passed>
 *      data: <Data found or response from mongoDB. {} if only 1, else [{}, ...]>
 *    }
 */
const readDBdata = async (collName, filters = {}) => {
  //create mongo client
  const client = new MongoClient(MONGO_URI, options);
  //get filter data
  const filter = filters.filter ?? null; //null if no _id passed
  const limit = filters.limit ?? 25; //max 25 results if not set (null or undefined)
  const start = +filters.start ?? 0; //start at 0 if not set
  //init response + filters passed
  const response = {
    filter,
    limit,
    start,
  };

  //Is filter valid object?
  if (filter != null && (typeof filter !== "object" || Array.isArray(filter))) {
    //DATA ERROR, invalid filter
    response.status = 404;
    response.error = true;
    response.message = "Invalid filter received. Please leave blank or pass a valid object.";
    response.data = filter;
    return response;
  } //
  else {
    //VALID filter, get DATA
    try {
      //connect to client
      await client.connect();

      //connect to db
      const myDB = client.db(MONGO_DB);
      //console.log("Connected.");

      //GET DATA, use filter params, if they exist
      const results =
        filter !== null
          ? await myDB
              .collection(collName)
              .find({ ...filter })
              .skip(start)
              .limit(limit)
              .toArray()
          : await myDB.collection(collName).find().skip(start).limit(limit).toArray();

      //Count RESULTS
      const total = results.length + " result(s) found.";

      //Set Response
      if (results.length) {
        //SUCCESS Response. Got DATA.
        response.status = 200;
        response.error = false;
        response.message = "Data found.";
        response.total = total;
        response.data = results.length == 1 ? results[0] : results;
      } else {
        //DATA ERROR, no data found.
        response.status = 204;
        response.error = false;
        response.message = "No results found with provided criteria.";
        response.data = results;
      }
    } catch (err) {
      //Internal ERROR
      response.status = 500;
      response.error = true;
      response.message = err.message;
      response.data = null;
    } finally {
      //disconnect
      client.close();
      //console.log("Disconnected.");
      return response;
    }
  }
};

/* ************************ DELETE DATA FROM COLLECTION ************************
 * Expects collection mame. OPTIONAL < "_id" string OR object containing fields and conditions to use as filter criteria>
 *    Returns response {
 *      status: 200, 500, 404
 *      error:  false, true
 *      message: description of what happened
 *      *total: <amt of items deleted>            *on delete attemps only
 *      filter: <_id or other filter passed>
 *      data: <Response from mongoDB.>
 *    }
 */
const deleteDBdata = async (collName, filter) => {
  //create mongo client
  const client = new MongoClient(MONGO_URI, options);
  //init response
  const response = { filter };

  try {
    //connect to client
    await client.connect();

    //connect to db
    const myDB = client.db(MONGO_DB);
    //console.log("Connected.");

    if (filter != null) {
      //Delete DATA, use filter params, if they exist
      const results = await myDB.collection(collName).deleteMany(typeof filter === "string" ? { _id: filter } : { ...filter });

      //Count RESULTS
      const total = results.deletedCount + "item(s) deleted.";

      //Set Response
      if (results.deletedCount > 0) {
        //SUCCESS Response. Deleted something..
        response.status = 200;
        response.error = false;
        response.message = "Data deleted.";
      }
      //DATA ERROR, nothing deleted
      else if (results.deletedCount === 0) {
        response.status = 400;
        response.error = true;
        response.message = "No data was deleted";
      }
      //Umm... deleted negative docs????
      else {
        response.status = 500;
        response.error = true;
        response.message = "An impossible error occurred lol.";
      }
      //Extra response info
      response.total = total;
      response.filter = filter;
      response.data = results;
    } else {
      //DATA ERROR, Invalid filter.
      response.status = 404;
      response.error = true;
      response.message = "Filter must be a string or an empty object to delete all {}";
      response.filter = filter;
      response.data = null;
    }
  } catch (err) {
    //Internal ERROR
    response.status = 500;
    response.error = true;
    response.message = err.message;
    response.filter = filter;
    response.data = null;
  } finally {
    //disconnect
    client.close();
    //console.log("Disconnected.");
    return response;
  }
};

/* ************************ UPDATE DATA OF A 1x ITEM IN A COLLECTION ************************
 * Expects collection mame, filter < "_id" string OR object containing fields and conditions to use as filter criteria>,
 * newData { query: <additionnal match criteria (arrayFilters)>, newValue: { key:value of data to update **$ for array matches} }
 *    Returns response {
 *      status: 201, 500, 400, 404
 *      error:  false, true
 *      message: description of what happened
 *      expected: <update body expected to use>
 *      filter: <_id or other filter passed>
 *      data: <Response from mongoDB.>
 *    }
 */
const updateDBdata = async (collName, filter, newData) => {
  //create mongo client
  const client = new MongoClient(MONGO_URI, options);
  //init response + filter passed
  const response = {
    filter,
  };

  //Is filter valid object?
  if (filter != null && (typeof filter !== "object" || Array.isArray(filter))) {
    //DATA ERROR, invalid filter
    response.status = 404;
    response.error = true;
    response.message = "Invalid filter received. Please leave blank or pass a valid object.";
    response.data = filter;
    return response;
  } //
  else {
    try {
      //connect to client
      await client.connect();

      //connect to db
      const myDB = client.db(MONGO_DB);
      //console.log("Connected.");

      const newValues = { $set: newData.newValue };
      const searchQuery = newData.query ? { ...filter, ...newData.query } : { ...filter };
      //console.log("newValues", JSON.stringify(newValues));
      //console.log("searchQuery", JSON.stringify(searchQuery));

      const results = await myDB.collection(collName).updateOne(searchQuery, newValues);

      //Set Response
      if (results.matchedCount) {
        //Yes, data modified?
        if (results.modifiedCount) {
          //SUCCESS Response
          const updatedData = await myDB
            .collection(collName)
            .find({ ...filter })
            .toArray();
          response.status = 201;
          response.error = false;
          response.message = "Data updated.";
          response.filter = filter;
          response.expected = newData;
          response.updated = updatedData.length == 1 ? updatedData[0] : updatedData;
          response.data = results;
        } else {
          //DATA ERROR, data found but no changes made..?
          response.status = 400;
          response.error = true;
          response.message = "Data found but not updated.";
          response.filter = filter;
          response.expected = newData;
          response.data = results;
        }
      } else {
        //DATA ERROR, no data found.
        response.status = 404;
        response.error = true;
        response.message = "No data found given provided criteria.";
        response.filter = filter;
        response.expected = newData;
        response.data = results;
      }
    } catch (err) {
      //Internal ERROR
      response.status = 500;
      response.error = true;
      response.message = err.message;
      response.filter = filter;
      response.expected = newData;
      response.data = null;
    } finally {
      //disconnect
      client.close();
      //console.log("Disconnected.");
      return response;
    }
  }
};

module.exports = {
  createDBdata,
  readDBdata,
  deleteDBdata,
  updateDBdata,
};
