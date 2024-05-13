import './table.scss';
export default function Table({ data }: { data: any }) {
    return (
        <>
            {data.length && <table id="moveHistory">
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Piece</th>
                    <th>Team</th>
                </tr>
                <tbody>

                    {data.map((row: any, i: number) => <tr key={`table-row-${i}`}>
                        <td>{row.from}</td>
                        <td>{row.to}</td>
                        <td>{row.piece}</td>
                        <td>{row.team}</td>

                    </tr>)}
                </tbody>
            </table>}
        </>

    )
}
