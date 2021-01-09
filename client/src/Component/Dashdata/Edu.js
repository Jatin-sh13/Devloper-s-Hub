import React from 'react'
import { connect } from 'react-redux'
import { Moment } from 'react-moment'
import { deleteEdu } from '../../Actions/Profile'
const Edu = ({ education, deleteEdu }) => {
    return (
        <div>
            <h2 style={{ color: 'white' }}>Education  Credentials</h2>
            <table>
                <thead>
                    <tr>
                        <th>College Name</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {education.map((edu) => (
                        <tr key={edu.id}>
                            <td>{edu.school}</td>
                            <td>{edu.degree}</td>
                            <td>
                                <button style={{ backgroundColor: '#780000', border: '1px solid black' }} onClick={() => deleteEdu(edu.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table><br /><br />
        </div>
    )
}
export default connect(null, { deleteEdu })(Edu)

