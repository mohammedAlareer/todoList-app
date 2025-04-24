export default function reducer(currentState,action){
    switch(action.type){
        case "added" :
            return [...currentState,action.payload];
        case "deleted": 
        return currentState.filter((t) =>t.id !== action.payload.id);

        case "updated" :
            return currentState.map((t) => t.id === action.payload.id ? {...t,...action.payload} : t);

        case "toggle" : 
            return currentState.map((t) => t.id === action.payload.id ? {...t,isCompleted:!t.isCompleted}: t);

        case "load":
            return action.payload;
            
        default :{
            throw Error("Unknow Action " + action.type)
        }
        
    }
} 