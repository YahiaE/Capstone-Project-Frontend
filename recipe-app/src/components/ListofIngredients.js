export default function ListofIngredients(props) {
    const data = props.data
console.log(data)

    return (
        <div>

            {data.map((item) => {
                
                return <ul key={props.keyId}>{item.ingredient}, {item.quantity} </ul>

            })}

        </div>
    );
}
