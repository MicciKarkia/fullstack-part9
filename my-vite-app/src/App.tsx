interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return (
    <h1>{props.name}</h1>
  )
}

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courses.map(course => {
        return (<Part key={course.name} course={course} />)
      })}
    </>
  )
}

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.course.kind) {
    case "basic":
      return (
        <>
          <div>
            <b>{props.course.name} {props.course.exerciseCount}</b>
            <br></br>
            {props.course.description}
          </div>
          <br></br>
        </>
      )
    case "group":
      return (
        <>
          <div>
            <b>{props.course.name} {props.course.exerciseCount}</b>
            <br></br>project exercises {props.course.groupProjectCount}
          </div>
          <br></br>
        </>
      )
    case "background":
      return (
        <>
          <div>
            <b>{props.course.name} {props.course.exerciseCount}</b>
            <br></br>
            <i>{props.course.description}</i>
            <br></br>
            submit to {props.course.backgroundMaterial}
          </div>
          <br></br>
        </>
      )
      case "special":
        return (
          <>
            <div>
              <b>{props.course.name} {props.course.exerciseCount}</b>
              <br></br>
              <i>{props.course.description}</i>
              <br></br>required skils {props.course.requirements.join(", ")}
            </div>
            <br></br>
          </>
        )
  }

}

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
