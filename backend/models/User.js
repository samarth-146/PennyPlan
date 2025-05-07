const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    monthlyIncome:{
        type:Number,
    },
    monthlyExpanse:{
        type:Number,
    },
    savingsGoal:{
        amount:{
            type:Number,
        },
        purpose:{
            type:String
        }
    },
    quizAnswers:{
        type:[Number]
    },
    quizScore:{
        type:Number
    },
    riskTolerance:{
        type:String,
        enum:["Low","Medium","High"]
    },
    roundUp:{
        enabled:{
            type:Boolean,
            default:false
        },
        method:{
            type:String,
            enum:['10','50','custom'],
            default:"10"
        },
        customValue:{
            type:Number,
            default:1
        }
    },
    roundUpSum:{
        type:Number,
        min:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});

const User=mongoose.model("User",userSchema);
module.exports=User;