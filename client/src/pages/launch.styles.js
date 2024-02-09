import styled from 'styled-components';

export const LaunchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  border: 2px solid var(--yellow);
  padding: 2em;
  margin: 1em 2em;
  border-radius: 1em;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.6);
`;

export const LaunchParagraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-left: 2em;
`;

export const LaunchForm = styled.form`
  display: flex;
  flex-direction: column;
  
  width: 50%;
  padding-top: 2em;
  gap: 0.4em;
`;