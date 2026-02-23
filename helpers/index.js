
const rpcDeadLine = () => {
    const deadline = new Date();
    return deadline.setSeconds(deadline.getSeconds() + 3);
}

export {
      rpcDeadLine
}