export const mineColor = () => {
    let colors = ["orangered", "darkgreen", "cyan", "orchid", "yellow", "crimson"];
    return colors[Math.floor(Math.random() * colors.length)];
};