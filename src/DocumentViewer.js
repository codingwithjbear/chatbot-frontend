import React from 'react';

const DocumentViewer = ({ content, onClose }) => {
  return (
    <div className="DocumentViewer">
      <div className="DocumentContent">
        {content}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DocumentViewer;
