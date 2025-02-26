import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetAllCourseLectures,
  RemoveLecture,
} from "../../Redux/Slices/LectureSlice.js";
import { GetAllQuizzesOfCourse, RemoveQuiz } from "../../Redux/Slices/QuizSlices.js";

function DisplayLectures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state?.lecture);
  const {quizzes} = useSelector((state) => state?.quiz);
  const { role } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.data._id);
  const [currentLecture, setCurrentLecture] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    if (!courseId || !lectureId) {
      return;
    }
     dispatch(RemoveLecture(courseId, lectureId));
     dispatch(GetAllCourseLectures(courseId));
     GetAllcourse();
  }

  async function onQuizDelete(quizId) {
    if (!quizId) {
       return;
    }
    dispatch(RemoveQuiz(quizId));
    dispatch(GetAllQuizzesOfCourse({courseId:state._id}));
    GetAllcourse();
  }

  async function GetAllDetails() {
     dispatch(GetAllQuizzesOfCourse({courseId:state._id}));
     dispatch(GetAllCourseLectures(state._id));
  }

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
    GetAllDetails();
    if (!lectures) {
      navigate(`course/${state?._id}/addlecture`);
    }
  }, []);
  return (
    <Homelayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-16 text-white mx-4 ">
        <div className="text-center text-2xl font-semibold text-teal-500">
          Course Name:{state?.title}
        </div>
        {lectures && lectures.length > 0 && (
          <div className="flex justify-center  gap-10 w-[100%]">
            <div className="space-y-5 w-[70%]  aspect-video p-2  rounded-lg shadow-[0_0_10px_teal]">
              <video
                controls
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                src={lectures && lectures[currentLecture]?.lecture?.secure_url}
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-teal-500 ">Title :{"  "}</span>
                  {lectures && lectures[currentLecture]?.title}
                </h1>
                <p>
                  <span className="text-teal-500 ">Description :{"  "}</span>
                  {lectures && lectures[currentLecture]?.description}
                </p>
              </div>
            </div>
            <ul className="w-[20%] max-h-[90vh] p-2 overflow-y-scroll rounded-lg shadow-[0_0_10px_teal] space-y-4">
             <p className="w-full text-center">Lecture And Quiz list</p>
              <li className="font-semibold text-xl  text-teal-500 flex items-center justify-center">
                {role === "ADMIN" && (
                  <div>
                    <button
                      onClick={() => {
                        navigate(`/course/${state?._id}/addlecture`, {
                          state: { ...state },
                        });
                      }}
                      className="btn btn-active ml-2 text-black bg-white hover:text-white "
                    >
                      Add lecture
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/course/${state?._id}/addquiz`, {
                          state: { ...state },
                        });
                      }}
                      className="btn btn-active ml-5 text-black bg-white hover:text-white "
                    >
                      Add Quiz
                    </button>
                  </div>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentLecture(idx)}
                      >
                        <span>
                          {" "}
                          Lecture {idx + 1} :{"  "}
                        </span>
                        {lecture.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() => {
                            onLectureDelete(state?._id, lecture?._id);
                          }}
                          className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
                {quizzes &&
                quizzes.map((quiz, idx) => {
                  return (
                    <li className="space-y-2" key={quiz._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          navigate(`/quiz/${quiz?._id}/attempt`, {
                            state: { ...quiz ,userId:userId},
                          });
                        }}
                      >
                        <span>
                          {" "}
                          quiz {idx + 1} :{"  "}
                        </span>
                        {quiz.title}
                      </p>
                      {role === "ADMIN" ? (
                        <button
                          onClick={() => {
                            onQuizDelete(quiz?._id);
                          }}
                          className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete quiz
                        </button>
                      ):(
                        <button
                          onClick={() => {
                            navigate(`/quiz/${quiz?._id}/attempt`, {
                              state: { ...quiz ,userId:userId},
                            });
                          }}
                          className="btn btn-accent px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Attempt Quiz
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {role === "ADMIN" && lectures.length == 0 && (
          <button
            onClick={() => {
              navigate(`/course/${state?._id}/addlecture`, {
                state: { ...state },
              });
            }}
            className="btn btn-active ml-5"
          >
            Add new lecture
          </button>
        )}
      </div>
    </Homelayout>
  );
}

export default DisplayLectures;
