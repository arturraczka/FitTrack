import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivitiesRequest } from './actions/activityActions';

function App() {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchActivitiesRequest());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Activities - Running</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
