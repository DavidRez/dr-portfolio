import './Quadilateral.css'

function Quadilateral() {
    const randomPos = (x = 1, y = 90) => {
        const min = Math.ceil(x);
        const max = Math.floor(y);
        return `${Math.floor(Math.random() * (max - min + 1) + min)}%`;
    }

    return (
        <div className='quadilateral'>
            <div className='quadilateral__graphic' style={{top: `${randomPos(1, 15)}`, left: `${randomPos(1, 15)}`}}></div>
            <div className='quadilateral__graphic' style={{top: `${randomPos(85, 99)}`, left: `${randomPos(85, 99)}`}}></div>
        </div>
    );
}

export default Quadilateral;