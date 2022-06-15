export default (hue = null, saturation = null, light = null, text = null) => {
    if (text) {
        console.log(text)
      let sum = 0;
      for (let i = 0; i < text.length; ++i) {
        sum += text[i].charCodeAt(0);
      }
  
      hue = Math.round(sum * text.length) % 360;
      if (hue < 0) hue += 360;
  
      if (!saturation) saturation = 70;
      saturation =
        saturation -
        saturation * 0.1 +
        (Math.round(sum * text.length) % (saturation * 0.1));
  
      if (!light) light = 50;
      light = light - light * 0.1 + (Math.round(sum * text.length) % 15);
    } else if (!hue) {
      hue = Math.round(Math.random() * 360);
      if (hue < 0) hue += 360;
    }
  
    if (!saturation) {
      saturation = Math.round(Math.random() * 101);
    }
  
    if (!light) {
      light = Math.round(Math.random() * 101);
    }
  
    return `hsl(${hue}, ${saturation}%, ${light}%)`;
  };