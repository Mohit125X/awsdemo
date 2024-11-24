import express from "express";
import bodyParser  from "body-parser";

import StateRouter from "./router/state.route.js";
import CityRouter from "./router/city.route.js";
import AdminRouter from "./router/admin.route.js";
import OwnerRouter from "./router/owner.route.js";
import TenantRouter from "./router/tenant.route.js";

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/state",StateRouter);
app.use("/city",CityRouter);
app.use("/admin",AdminRouter);
app.use("/owner",OwnerRouter);
 app.use("/tenant",TenantRouter);

app.listen(4000,()=>{
    console.log("Server Started...");
});