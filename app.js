import express  from "express";
import db from "./database/database-connectivity.js";
import bodyParser from "body-parser";
import AdminRouter from "./route/admin.route.js"

import TenantRouter from "./route/tenant.route.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/admin",AdminRouter);

app.use("/tenant",TenantRouter);

app.listen(3000,()=>{
   console.log("server Started");
});