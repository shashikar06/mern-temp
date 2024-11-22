import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';

import JobInfo from './Jobinfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);


const Job = ({
    _id,
    company,
    position,
    jobStatus,
    jobType,
    createdAt,
    location

}) => {
    const date = day(createdAt).format('MMM Do, yyyy');

    const deleteJob = (e,_id) => {
        e.preventDefault();
        console.log(_id);
    }
  return (
    <div className='card m-2 bg-dark text-light'>
        <div className=' text-center'>
            <h3> {company}</h3>
        </div>
        <div className='text-center'>
            <p> <FaBriefcase />  {position}</p>
            <p><FaLocationArrow />  {location}</p>
            <p className='fw-bold'> JOBSTATUS <span class="badge bg-info text-dark">{jobStatus}</span></p>
            <p className='fw-bold'>  JOBTYPE   <span class="badge bg-info text-dark">{jobType}</span></p>
            <p><FaCalendarAlt />   date :{ date}</p>
        </div>
       
            <div class="d-flex justify-content-center">
                <div className='m-2'>
                     <Link to={`/dashboard/edit-job/${_id}`} className='btn btn-primary btn-sm'>Edit</Link>
                </div>
                
                    <div className='m-2'>
                        
                        <Form method='post' action={`../delete-job/${_id}`}>
                            <button type='submit' className='btn btn-primary btn-sm'>delete</button>
                        </Form>
                    </div>
                
                </div>
    </div>
  )
}

export default Job