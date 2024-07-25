import React from 'react';

// Define the CSS as a JavaScript object
const styles = {
  root: {
    '--orange-light': '#f4a261', // Light orange color
    '--orange-dark': '#e76f51',  // Darker orange color
    '--white': '#fff',
  },
  cat: {
    width: '100px',
    height: '100px',
    display: 'block',
    position: 'relative',
  },
  body: {
    width: '85%',
    height: '60%',
    backgroundColor: 'var(--orange-dark)',
    borderRadius: '50% 10% 50% 40% / 60% 5% 65% 50%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  head: {
    width: '60%',
    height: '50%',
    backgroundColor: 'var(--orange-dark)',
    borderRadius: '50% 50% 30% 30% / 60% 60% 30% 30%',
    position: 'absolute',
    top: '10%',
    right: 0,
  },
  eyes: {
    height: '5%',
    width: '50%',
    top: '45%',
    right: '15%',
    position: 'absolute',
  },
  eye: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'var(--white)',
    animation: 'eye-move 3s none infinite',
    position: 'absolute',
  },
  ear: {
    width: '0',
    height: '0',
    borderColor: 'transparent transparent var(--orange-dark)',
    borderStyle: 'solid',
    position: 'absolute',
  },
  earLeft: {
    borderWidth: '0 7px 10px 7px',
    left: '15%',
    bottom: '90%',
    transform: 'rotate(-30deg)',
  },
  earRight: {
    borderWidth: '0 10px 15px 10px',
    right: '5%',
    bottom: '85%',
    transform: 'rotate(30deg)',
  },
  tail: {
    height: '18%',
    width: '50%',
    backgroundColor: 'var(--orange-dark)',
    bottom: 0,
    right: '35%',
    borderRadius: '50%/250%',
    position: 'absolute',
  },
  tailInner: {
    height: '100%',
    transformOrigin: 'center right',
    transform: 'rotate(0deg)',
    width: '25px',
    right: '26%',
    animation: 'tail 2s none infinite',
    borderTopLeftRadius: '50% 50%',
    borderBottomLeftRadius: '50% 50%',
    backgroundColor: 'inherit',
    position: 'absolute',
  },
};

const CatLoading = () => {
  return (
    <div style={styles.root}>
      <div style={{ ...styles.cat, position: 'relative' }}>
        <div style={styles.body}></div>
        <div style={styles.head}>
          <div style={styles.eyes}>
            <div style={{ ...styles.eye, left: '0' }}></div>
            <div style={{ ...styles.eye, right: '0' }}></div>
          </div>
          <div style={{ ...styles.ear, ...styles.earLeft }}></div>
          <div style={{ ...styles.ear, ...styles.earRight }}></div>
        </div>
        <div style={styles.tail}>
          <div style={styles.tailInner}>
            <div style={styles.tailInner}>
              <div style={styles.tailInner}>
                <div style={styles.tailInner}>
                  <div style={styles.tailInner}>
                    <div style={styles.tailInner}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes tail {
          5% { transform: rotate(0); }
          50% { transform: rotate(10deg); }
          70%, 100% { transform: rotate(0); }
        }
        @keyframes eye-move {
          0% { transform: scaleY(1); }
          5% { transform: scaleY(0); }
          10%, 100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default CatLoading;
