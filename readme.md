## This is a generalized automa.

The implemtation will be javascript. This will be a client server architecture. The view will be using three.js. The is the option to compute on the server or compute when applicable in the client. 

The classic automa is Conway Game of Live. For clarity the Conway's automa is implemented in dimension two, three and N. 

The goals of this project is a visualization and abstraction upon automas. To allow users to create there own rules for space, entities and there dependecies. Questions I am intereting in answering are:

* what role does topolgy play in the automa
* is the automa independent or not of the partiioning of space
* how do autom rules change over dimesion and topology

Note that why this implementation seperates space form entity. Many Conway visualtion do not disinquish between the living cell and the space this cell inhabits, naturally. However in the spirt of generalizizing to allow greater flexiblity in modiing automa the view of Conaway in this implementation is an entity (living cell) inhabits a particular space (a sqare/cube/hyper-cube). The space is inert in the Conway model, and the entities state is binary, and the rules for next states is based on entity neighboor space only. Clearly one can have with a more general model even with Conway, maybe allow locomotion of the entities, add state to the space, modify the rules so the space also effects entity state, and expand on state.  

Simple topologoes that will be consider are :

* flat infinit space, the plane, R3, ... RN
* flat space bounded, the sqaure, cube, ... Simple N
* Tourus Space T2, T3, ... TN
* Sperical Space, S1, S2, S3, ...., SN
* PRojective Plane RP2, RP3, ... RPN

Note any compact tow dimensional topology is derives from combinations of S2, T2, and RP2. This a deep result that will not be discussed. However this may be leveraged in time. 

This automa can be visualized in 1,2 and 3 dimensions faithfully. Other techniques can be employed to visualize in higher dimension such as graph. This because the essential mechanics of the evolution is based on neighboring "cell" and neighboring "entities"

Terms: "cell" of "simplex" is a spatial concept. In one two and three dimension the concept is clear, and it just a partitioning of space. In higher dimensions the concept is the same but some care needs to be applied to carry of ideas of what neighboring "cell" are and how "entities" transition between cell. 


login
create a automat

an automa has topology, dimension, partition size
simplex-cube
simplex-cube has space-state
simplex-cube position is static but state
an entity(s) can inhabitant a simplex-cube
entity has entity-state
entity can migrate to another simplex-cube

A(T,P,S(P),E1(S1),E2(S2), .... )
