import {Button} from "primereact/button"
import {Skeleton} from "primereact/skeleton"

export default function Categories(props) {
    return(
        <ul>
            {props.categories !== null ?
                props.categories.map(category => {
                    return (
                        <li key={category.id} className={`category${props.clickable ? " hover" : ""}${category === props.selectedCategory ? " selected" : ""}`} onClick={() => props.clickable && props.handleAction(category)}>
                            <span className="title">{category.title}</span>
                            <Button rounded icon={props.page !== "upload" ? props.buttonIcon : category.link === null ? "pi pi-cloud-upload" : "pi pi-check"} severity={props.page !== "upload" ? "" : category.link === null ? "" : "success"} onClick={() => props.handleAction(category)} />
                        </li>
                    )})
                :
                <>
                    <Skeleton height="4.5rem" borderRadius="100rem"/>
                    <Skeleton height="4.5rem" borderRadius="100rem"/>
                    <Skeleton height="4.5rem" borderRadius="100rem"/>
                </>
            }
        </ul>
    )
}

/*
{{
    "/edit": <Button icon="pi pi-trash" rounded onClick={() => props.handleAction(category.id)}/>,
    "/upload": <Button icon={`pi ${category.link === null ? "pi-cloud-upload" : "pi-check"}`} rounded severity={category.link === null ? "" : "success"} onClick={() => selectCategory(category, props.page)}/>,
    "/scores": <Button icon="pi pi-arrow-right" rounded onClick={() => selectCategory(category, props.page)}/>,
}[props.page]}
 */