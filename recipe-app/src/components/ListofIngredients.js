export default function ListofIngredients(props) {
    const data = props.data


    return (
        <div className='vids'>

            {data.map((item) => {
                return <ul key={item.id}>{item.name} {item.amount} </ul>

            })}

        </div>
    );
}
