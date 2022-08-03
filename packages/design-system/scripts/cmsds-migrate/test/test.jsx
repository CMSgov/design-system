import React from 'react'

function App() {
  return (
    <div>
<Button className="ds-c-button" type="button" variation="primary" />

<Button 
  class="ds-c-button" 
  width="40" 
  type="button" variation="primary"
  >
      this next word should be primary
</Button>

<Button className="ds-c-button" variation="transparent" />

      <Button className="ds-c-button" variation="success" />

<
      button 
className='ds-c-button' type="button" variation='transparent' />

      <Button 
  className={ () => { return ('test') }}
  type="button" variation='danger'
  >
      this next word should be 'danger', and not solid
</Button>

      <Button 
        className={ () => { return ('test') }}
        type="button" variation='success'
      >
        this next word should be 'success', and not solid
      </Button>
  </div>
  );
}

export default App;
