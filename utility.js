const undefinedS = "undefined";

function cloneVar(pointer) {
	return JSON.parse(JSON.stringify(pointer));
}
var copyVar = cloneVar;
