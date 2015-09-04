
// Interpolates the dataset for the given (fractional) iteration.
var bisect = d3.bisector(function(d) { return d; });
function interpolateData(iteration, iterations, results) {
  var i = bisect.left(iterations, iteration);

  // Finds (and possibly interpolates) the value for the specified iteration.
  function interpolateValues(values, getter, i, iteration) {
    if (i > 0) {
      var ta = iterations[i], tb = iterations[i - 1],
          t = (iteration - ta) / (tb - ta);
      return getter(values[i]) * (1 - t) + getter(values[i - 1]) * t;
    }
    return getter(values[i]);
  }

  return results.map(function(d) {
    return {
      key: d.key,
      label: d.label,
      x: interpolateValues(d.pos, function(d) { return d.x; }, i, iteration),
      y: interpolateValues(d.pos, function(d) { return d.y; }, i, iteration)
    };
  });
}

// Left pad number with '0'
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Max element in array
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};  