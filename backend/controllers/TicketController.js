const db = require("../db");


const TicketPostController =  (req,res)=>{
    try {
        const { ticket_name, iris_id, jira_id,  description, date, developer} = req.body
        let sql = 'INSERT INTO jira_ticket (ticket_name, jira_id, iris_id, description, created_at, developer_id ) values (?)'
        let values = [ticket_name, jira_id, iris_id, description, date, developer]
        db.query(sql, [values], (err)=>{
            if(err) throw err
            return res
                     .status(200)
                     .json({"message" : "Ticket Created", "success" : true })

        })
    } catch (error) {
        return res
                .status(500)
                .json({"message" : error.message, "success" : false})
    }
}

module.exports = TicketPostController;