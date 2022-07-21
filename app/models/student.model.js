const sql = require("./db.js");

// constructor
const Student = function(student) {
  this.vName = student.vName;
  this.vDescription = student.vDescription;
  this.iStatus = student.iStatus;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { iStudentId: res.insertId, ...newStudent });
    result(null, { iStudentId: res.insertId, ...newStudent });
  });
};

Student.findById = (iStudentId, result) => {
  sql.query(`SELECT * FROM students WHERE id = ${iStudentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.getAll = (vName, result) => {
  let query = "SELECT * FROM students";

  if (vName) {
    query += ` WHERE vName LIKE '%${vName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.getAllPublished = result => {
  sql.query("SELECT * FROM students WHERE iStatus=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.updateById = (iStudentId, student, result) => {
  sql.query(
    "UPDATE students SET vName = ?, vDescription = ?, iStatus = ? WHERE iStudentId = ?",
    [student.vName, student.vDescription, student.iStatus, iStudentId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { iStudentId: iStudentId, ...student });
      result(null, { iStudentId: iStudentId, ...student });
    }
  );
};

Student.remove = (iStudentId, result) => {
  sql.query("DELETE FROM students WHERE iStudentId = ?", iStudentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with iStudentId: ", iStudentId);
    result(null, res);
  });
};

Student.removeAll = result => {
  sql.query("DELETE FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = Student;
