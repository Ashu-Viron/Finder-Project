export function Button({label,onClick}){
    return(
        <button onClick={onClick} type="button" className="w-full text-white bg-slate-300 hover:bg-slate-500 focus:outline-none h-11 rounded-lg">
            {label}
        </button>
    )
}