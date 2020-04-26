export const uuid = () =>
    Math.random()
        .toString(36)
        .substr(2) + Date.now().toString(36);

export const progressColor = (progress) => {
    return progress === 0
        ? '#c70039'
        : progress <= 25
        ? '#ff6363'
        : progress > 25 && progress <= 50
        ? '#ffbd69'
        : progress > 50 && progress <= 75
        ? '#363062'
        : '#21bf73';
};
