const setForm = (prev) => ({...prev, [name]: value})
const SingUp = () => {
    const [form, _setForm] = useState({});

    const submitForm = (event) => {
        _setForm(setForm(event.target));
    }
    return (
        <div className="min-h-full flex-1 flex flex-col justify-center items-center">
            <img src="/public/teamPlus.svg" alt="" className={"w-1/3"}/>
            <form method={"POST"} action={""} onSubmit={submitForm} className=""></form>
        </div>
    )
}