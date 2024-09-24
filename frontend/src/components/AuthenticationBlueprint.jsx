import React from 'react'

const AuthenticationBlueprint = ({redWhere}) => {
    return(
        <div className='w-full h-screen flex md:flex-row'>
            <div className={`${redWhere === "left"? "from-red-400 to-red-500": "bg-white"} flex-1 bg-gradient-to-b`}>
                
            </div>
            <div className={`flex-1 ${redWhere === "right"? "from-red-400 to-red-500": "bg-white"} bg-gradient-to-b`}>

            </div>
        </div>
    )
}

export default AuthenticationBlueprint