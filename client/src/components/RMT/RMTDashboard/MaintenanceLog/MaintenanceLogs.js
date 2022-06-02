import React from 'react'

const MaintenanceLogs = ({ logs }) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Entry date</th>
                        <th>Electronics</th>
                        <th>Massage Mat</th>
                        <th>Selfcare Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {logs && logs?.map((log)=>(
                        <tr key={log?._id}>
                            <td>{new Date(log?.dateAndTime).toLocaleDateString('en-ca')}</td>
                            <td>{log?.electronicsNotes}</td>
                            <td>{log?.massageMatNotes}</td>
                            <td>{log?.selfCareToolsNotes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MaintenanceLogs