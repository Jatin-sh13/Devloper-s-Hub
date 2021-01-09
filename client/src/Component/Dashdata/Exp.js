import React from 'react'
import { connect } from 'react-redux'
import { Moment } from 'react-moment'
import { deleteExp } from '../../Actions/Profile'
const Exp = ({ experience, deleteExp }) => {
    console.log(experience)
    return (
        <div>
            <h2 style={{ color: 'white' }}>Experience Credentials</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {experience.map((exp) => (
                        <tr key={exp.id}>
                            <td>{exp.company}</td>
                            <td>{exp.title}</td>
                            <td>
                                <button style={{ backgroundColor: '#780000', border: '1px solid black' }} onClick={() => deleteExp(exp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default connect(null, { deleteExp })(Exp)
