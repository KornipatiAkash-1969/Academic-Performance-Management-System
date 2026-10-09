import './index.css';

import {
  useEffect,
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import {
  getStudentMarks
} from '../../services/marksService';

function StudentMarks() {

  // ======================================
  // STATES
  // ======================================

  const [marks, setMarks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [totalMarks, setTotalMarks] =
    useState(0);

  const [averageMarks, setAverageMarks] =
    useState(0);

  // ======================================
  // LOAD MARKS
  // ======================================

  useEffect(() => {

    loadMarks();

  }, []);

  const loadMarks =
    async () => {

    try {

      const response =
        await getStudentMarks();

      console.log(
        'FULL RESPONSE:',
        response
      );

      console.log(
        'MARKS ARRAY:',
        response.marks
      );

      const marksData =

        response.marks || [];

      // SET MARKS

      setMarks(marksData);

      // TOTAL MARKS

      let total = 0;

      marksData.forEach((item) => {

        total +=
          Number(
            item.marks_obtained
          );

      });

      setTotalMarks(total);

      // AVERAGE

      if (marksData.length > 0) {

        const avg =

          total /
          marksData.length;

        setAverageMarks(

          avg.toFixed(2)

        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="student" title="Marks & Performance">


      {/* CONTENT */}

      <div className="student-marks-content">

        {/* TOP */}

        <div className="marks-top">

          <h1>
            My Marks
          </h1>

          <p>
            View academic performance
          </p>

        </div>


        {/* SUMMARY */}

        <div className="summary-grid">

          <div className="summary-card">

            <h3>
              Subjects
            </h3>

            <p>
              {marks.length}
            </p>

          </div>

          <div className="summary-card">

            <h3>
              Total Marks
            </h3>

            <p>
              {totalMarks}
            </p>

          </div>

          <div className="summary-card">

            <h3>
              Average
            </h3>

            <p>
              {averageMarks}%
            </p>

          </div>

        </div>


        {/* LOADING */}

        {

          loading
          ? (

            <div className="loading-box">

              Loading Marks...

            </div>

          )
          : (

            <div className="marks-grid">

              {

                marks.length > 0
                ? (

                  marks.map((mark) => (

                    <div
                      key={mark.id}
                      className="mark-card"
                    >

                      {/* TOP */}

                      <div className="card-top">

                        <h3>

                          {

                            mark.subject_name ||

                            mark.subject_id ||

                            'Subject'

                          }

                        </h3>

                        <span className="grade-badge">

                          {mark.grade}

                        </span>

                      </div>


                      {/* INFO */}

                      <div className="mark-info">

                        <p>

                          <strong>
                            Student ID:
                          </strong>

                          {' '}

                          {mark.student_id}

                        </p>

                        <p>

                          <strong>
                            Subject ID:
                          </strong>

                          {' '}

                          {mark.subject_id}

                        </p>

                        <p>

                          <strong>
                            Assessment ID:
                          </strong>

                          {' '}

                          {mark.assessment_id}

                        </p>

                        <p>

                          <strong>
                            Marks:
                          </strong>

                          {' '}

                          {mark.marks_obtained}

                        </p>

                        <p>

                          <strong>
                            Percentage:
                          </strong>

                          {' '}

                          {mark.percentage}%

                        </p>

                      </div>

                    </div>

                  ))

                )
                : (

                  <div className="empty-box">

                    No Marks Available

                  </div>

                )

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>
  );
}

export default StudentMarks;