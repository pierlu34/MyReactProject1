import useInput from "../../../hooks/useInput.js";
import Input from "../../Input/Input.component.jsx";
import Textarea from "../../Textarea/Textarea.component.jsx";
import {format} from "date-fns";
import { FaShareNodes } from "react-icons/fa6";

const AddEditActivity = ({ activity, onSubmit }) => {
    const formattedDate = activity?.dueDate ? format(new Date(activity.dueDate), 'yyyy-MM-dd') : '';
    const {value: dueDateValue, handleChange: handleDueDateChange} = useInput(formattedDate);
    const {value: nameValue, handleChange: handleNameChange} = useInput(activity?.name,  'Nome');
    const {value: descriptionValue, handleChange: handleDescriptionChange} = useInput(activity?.description, 'Descrizione');

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            dueDate: new Date(dueDateValue).getTime(),
            name: nameValue,
            description: descriptionValue,
        }

        onSubmit(payload)
    }
    return <form className="form" id="add-edit-activity" onSubmit={handleSubmit}>
        <Input id="dueDate" name="dueDate" type="date" label="Data di scadenza" value={dueDateValue} onChange={handleDueDateChange}/>
        <Input id="name" name="name" value={nameValue} onChange={handleNameChange} placeholder="Nome"/>
        <Textarea rows={5} cols={10} id="description" name="description" value={descriptionValue} onChange={handleDescriptionChange} placeholder="Descrizione"/>

    </form>
}

export default AddEditActivity;