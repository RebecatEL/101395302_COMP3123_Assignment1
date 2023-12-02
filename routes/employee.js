const express = require("express")
const EmpModel = require('../models/Employee')

const routes = express.Router()

//http://localhost:8089/api/vi/emp/employees
// 3. Get All Employees
routes.get("/employees", async (req, res) => {
    try {
        const empList = await EmpModel.find({})
        res.status(201).send(empList)
    } catch (error) { //
        res.status(500).send(error)
    }
})

//http://localhost:8089/api/vi/emp/employees
// 4. Allow user to create new employee account
routes.post("/employees", async (req, res) => {
    try {
        const newEmp = new EmpModel({
            ...req.body
        })
        await newEmp.save()
        res.status(201).send(newEmp)
    } catch (error) { //
        res.status(500).send(error)
    }
})

//http://localhost:8089/api/vi/emp/employees/eid
// 5. Get employee deatils By ID
routes.get("/employees/:eid", async (req, res) => {
    try {
        const empDetails = await EmpModel.findById(new ObjectId(req.params.eid))
        res.status(200).send(empDetails)
    } catch (error) { 
        res.status(500).send(error)
    }
})

//http://localhost:8089/api/vi/emp/employees/eid
// 6. Update employee details By ID
routes.put("/employees/:eid", async (req, res) => {
    //
    try {
        const updatedUser = await EmpModel.findByIdAndUpdate(req.params.eid, req.body, {new:true})
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).send({ message: 'Employee not found' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//http://localhost:8089/api/vi/emp/employees?eid=xxx
// 7. Delete employee by employee id
routes.delete("/employees", async (req, res) => {
    try {
        const { eid } = req.query
        const emp = await EmpModel.findOneAndDelete({ _id: eid }) 
        if(!emp) { 
            res.status(404).send({ message: "Employee Not found" })
                // Need the input has the same length with auto-generated id to trigger this message
        } else {
            res.status(204).send(emp)
        }
    } catch (error) { 
        console.error(error);
        res.status(500).send(error)
    }
})

module.exports = routes