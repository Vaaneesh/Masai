import React from 'react';
import './App.css';
import ThemeToggle from './components/ThemeToggle';
import FeedbackForm from './components/Feedbackform';
import FeedbackList from './components/FeedbackList';
const database=""
function App() {
  const [feedbacks, setFeedbacks]=React.useState([]);
  const [theme, setTheme]=React.useState(localStorage.getItem('theme')||'light');
  React.useEffect(()=>{
    const feedbackRef=database.ref('feedbacks');
    feedbackRef.on('value',(snapshot)=>{
      const data=snapshot.val();
      const loadedFeedbacks=[];
      for(let id in data){
        loadedFeedbacks.push({id,...data[id]});
      }
      setFeedbacks(loadedFeedbacks);
    });
    return()=>feedbackRef.off();
  },[]);
  const addFeedback=(feedback)=>{
    const feedbackRef=database.ref('feedbacks');
    feedbackRef.push(feedback);
  }
  const toggleTheme=()=>{
    setTheme(theme==='light'?'dark':'light');
  };
  const deleteFeedback=(id)=>{
    const feedbackRef=database.ref('feedbacks').child(id);
    feedbackRef.remove();
  }
  return (
    <div className="container">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
      <h1>Feedback Board</h1>
      <FeedbackForm onSubmit={addFeedback} />
      <FeedbackList feedbacks={feedbacks} onDelete={deleteFeedback}/>
    </div>
  );
}

export default App;
