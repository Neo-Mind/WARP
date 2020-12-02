var bt = 0x12;
var wd = 0x1234;
var dw = 0x123456;

function Test1Op(fn)
{
	Debug.clear();
	[
		[   bt    ],
		[   wd    ],
		[   dw    ],
		    
		[   BL    ],
		[   BX    ],
		[   EBX    ],
		[   AL    ],
		[   AX    ],
		[   EAX    ],
		    
		[   [bt]    ],
		[   [wd]    ],
		[   [dw]    ],
		[   [BX]    ],
		[   [BX, bt]    ],
		[   [BX, wd]    ],
		[   [BX, DI]    ],
		[   [BX, DI, bt]    ],
		[   [BX, DI, wd]    ],
		[   [EBX]    ],
		[   [EBX, bt]    ],
		[   [EBX, wd]    ],
		[   [EBX, dw]    ],
		[   [EBX, EDI]    ],
		[   [EBX, EDI, bt]    ],
		[   [EBX, EDI, wd]    ],
		[   [EBX, EDI, dw]    ],
		[   [4, EBX]    ],
		[   [4, EBX, bt]    ],
		[   [4, EBX, wd]    ],
		[   [4, EBX, dw]    ],
		[   [4, EBX, EDI]    ],
		[   [4, EBX, EDI, bt]    ],
		[   [4, EBX, EDI, wd]    ],
		[   [4, EBX, EDI, dw]    ],
		    
		[   WORD_PTR, [bt]    ],
		[   WORD_PTR, [wd]    ],
		[   WORD_PTR, [dw]    ],
		[   WORD_PTR, [BX]    ],
		[   WORD_PTR, [BX, bt]    ],
		[   WORD_PTR, [BX, wd]    ],
		[   WORD_PTR, [BX, DI]    ],
		[   WORD_PTR, [BX, DI, bt]    ],
		[   WORD_PTR, [BX, DI, wd]    ],
		[   WORD_PTR, [EBX]    ],
		[   WORD_PTR, [EBX, bt]    ],
		[   WORD_PTR, [EBX, wd]    ],
		[   WORD_PTR, [EBX, dw]    ],
		[   WORD_PTR, [EBX, EDI]    ],
		[   WORD_PTR, [EBX, EDI, bt]    ],
		[   WORD_PTR, [EBX, EDI, wd]    ],
		[   WORD_PTR, [EBX, EDI, dw]    ],
		[   WORD_PTR, [4, EBX]    ],
		[   WORD_PTR, [4, EBX, bt]    ],
		[   WORD_PTR, [4, EBX, wd]    ],
		[   WORD_PTR, [4, EBX, dw]    ],
		[   WORD_PTR, [4, EBX, EDI]    ],
		[   WORD_PTR, [4, EBX, EDI, bt]    ],
		[   WORD_PTR, [4, EBX, EDI, wd]    ],
		[   WORD_PTR, [4, EBX, EDI, dw]    ],
		    
		    
		[   BYTE_PTR, [bt]    ],
		[   BYTE_PTR, [wd]    ],
		[   BYTE_PTR, [dw]    ],
		[   BYTE_PTR, [BX]    ],
		[   BYTE_PTR, [BX, bt]    ],
		[   BYTE_PTR, [BX, wd]    ],
		[   BYTE_PTR, [BX, DI]    ],
		[   BYTE_PTR, [BX, DI, bt]    ],
		[   BYTE_PTR, [BX, DI, wd]    ],
		[   BYTE_PTR, [EBX]    ],
		[   BYTE_PTR, [EBX, bt]    ],
		[   BYTE_PTR, [EBX, wd]    ],
		[   BYTE_PTR, [EBX, dw]    ],
		[   BYTE_PTR, [EBX, EDI]    ],
		[   BYTE_PTR, [EBX, EDI, bt]    ],
		[   BYTE_PTR, [EBX, EDI, wd]    ],
		[   BYTE_PTR, [EBX, EDI, dw]    ],
		[   BYTE_PTR, [4, EBX]    ],
		[   BYTE_PTR, [4, EBX, bt]    ],
		[   BYTE_PTR, [4, EBX, wd]    ],
		[   BYTE_PTR, [4, EBX, dw]    ],
		[   BYTE_PTR, [4, EBX, EDI]    ],
		[   BYTE_PTR, [4, EBX, EDI, bt]    ],
		[   BYTE_PTR, [4, EBX, EDI, wd]    ],
		[   BYTE_PTR, [4, EBX, EDI, dw]    ],
		
	].forEach(
		function(arg)
		{
			Debug.show(fn(arg[0], arg[1]));
		}
	);
	return NOP;
}

function Test2Op(fn)
{
	Debug.clear();	
	[
		[     CL, bt    ],
		[     CX, bt    ],
		[     CX, wd    ],
		[     ECX, bt    ],
		[     ECX, wd    ],
		[     ECX, dw    ],
		      
		[     AL, bt    ],
		[     AX, bt    ],
		[     AX, wd    ],
		[     EAX, bt    ],
		[     EAX, wd    ],
		[     EAX, dw    ],
		      
		[     CL, BL    ],
		[     CX, BL], //special for MOV*X
		[     CX, BX    ],
		[     ECX, BL], //special for MOV*X
		[     ECX, BX], //special for MOV*X
		[     ECX, EBX    ],
		      
		[     ECX, [bt]    ],
		[     ECX, [wd]    ],
		[     ECX, [dw]    ],
		[     ECX, [BX]    ],
		[     ECX, [BX, bt]    ],
		[     ECX, [BX, wd]    ],
		[     ECX, [BX, DI]    ],
		[     ECX, [BX, DI, bt]    ],
		[     ECX, [BX, DI, wd]    ],
		[     ECX, [EBX]    ],
		[     ECX, [EBX, bt]    ],
		[     ECX, [EBX, wd]    ],
		[     ECX, [EBX, dw]    ],
		[     ECX, [EBX, EDI]    ],
		[     ECX, [EBX, EDI, bt]    ],
		[     ECX, [EBX, EDI, wd]    ],
		[     ECX, [EBX, EDI, dw]    ],
		[     ECX, [4, EBX]    ],
		[     ECX, [4, EBX, bt]    ],
		[     ECX, [4, EBX, wd]    ],
		[     ECX, [4, EBX, dw]    ],
		[     ECX, [4, EBX, EDI]    ],
		[     ECX, [4, EBX, EDI, bt]    ],
		[     ECX, [4, EBX, EDI, wd]    ],
		[     ECX, [4, EBX, EDI, dw]    ],
		      
		[     ECX, BYTE_PTR, [bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [dw]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX, DI]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX, DI, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [BX, DI, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, dw]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, EDI]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, EDI, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, EDI, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [EBX, EDI, dw]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, dw]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, EDI]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, EDI, bt]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, EDI, wd]], //special for MOV*X
		[     ECX, BYTE_PTR, [4, EBX, EDI, dw]], //special for MOV*X
		      
		[     CX, [bt]    ],
		[     CX, [wd]    ],
		[     CX, [dw]    ],
		[     CX, [BX]    ],
		[     CX, [BX, bt]    ],
		[     CX, [BX, wd]    ],
		[     CX, [BX, DI]    ],
		[     CX, [BX, DI, bt]    ],
		[     CX, [BX, DI, wd]    ],
		[     CX, [EBX]    ],
		[     CX, [EBX, bt]    ],
		[     CX, [EBX, wd]    ],
		[     CX, [EBX, dw]    ],
		[     CX, [EBX, EDI]    ],
		[     CX, [EBX, EDI, bt]    ],
		[     CX, [EBX, EDI, wd]    ],
		[     CX, [EBX, EDI, dw]    ],
		[     CX, [4, EBX]    ],
		[     CX, [4, EBX, bt]    ],
		[     CX, [4, EBX, wd]    ],
		[     CX, [4, EBX, dw]    ],
		[     CX, [4, EBX, EDI]    ],
		[     CX, [4, EBX, EDI, bt]    ],
		[     CX, [4, EBX, EDI, wd]    ],
		[     CX, [4, EBX, EDI, dw]    ],
		      
		[     CL, [bt]    ],
		[     CL, [wd]    ],
		[     CL, [dw]    ],
		[     CL, [BX]    ],
		[     CL, [BX, bt]    ],
		[     CL, [BX, wd]    ],
		[     CL, [BX, DI]    ],
		[     CL, [BX, DI, bt]    ],
		[     CL, [BX, DI, wd]    ],
		[     CL, [EBX]    ],
		[     CL, [EBX, bt]    ],
		[     CL, [EBX, wd]    ],
		[     CL, [EBX, dw]    ],
		[     CL, [EBX, EDI]    ],
		[     CL, [EBX, EDI, bt]    ],
		[     CL, [EBX, EDI, wd]    ],
		[     CL, [EBX, EDI, dw]    ],
		[     CL, [4, EBX]    ],
		[     CL, [4, EBX, bt]    ],
		[     CL, [4, EBX, wd]    ],
		[     CL, [4, EBX, dw]    ],
		[     CL, [4, EBX, EDI]    ],
		[     CL, [4, EBX, EDI, bt]    ],
		[     CL, [4, EBX, EDI, wd]    ],
		[     CL, [4, EBX, EDI, dw]    ],
		      
		[     EAX, [bt]    ],
		[     EAX, [wd]    ],
		[     EAX, [dw]    ],
		      
		[     EAX, BYTE_PTR, [bt]], //special for MOV*X
		[     EAX, BYTE_PTR, [wd]], //special for MOV*X
		[     EAX, BYTE_PTR, [dw]], //special for MOV*X
		      
		[     AX, [bt]    ],
		[     AX, [wd]    ],
		[     AX, [dw]    ],
		      
		[     AL, [bt]    ],
		[     AL, [wd]    ],
		[     AL, [dw]    ],
		      
		[     [bt], ECX    ],
		[     [wd], ECX    ],
		[     [dw], ECX    ],
		[     [BX], ECX    ],
		[     [BX, bt], ECX    ],
		[     [BX, wd], ECX    ],
		[     [BX, DI], ECX    ],
		[     [BX, DI, bt], ECX    ],
		[     [BX, DI, wd], ECX    ],
		[     [EBX], ECX    ],
		[     [EBX, bt], ECX    ],
		[     [EBX, wd], ECX    ],
		[     [EBX, dw], ECX    ],
		[     [EBX, EDI], ECX    ],
		[     [EBX, EDI, bt], ECX    ],
		[     [EBX, EDI, wd], ECX    ],
		[     [EBX, EDI, dw], ECX    ],
		[     [4, EBX], ECX    ],
		[     [4, EBX, bt], ECX    ],
		[     [4, EBX, wd], ECX    ],
		[     [4, EBX, dw], ECX    ],
		[     [4, EBX, EDI], ECX    ],
		[     [4, EBX, EDI, bt], ECX    ],
		[     [4, EBX, EDI, wd], ECX    ],
		[     [4, EBX, EDI, dw], ECX    ],
		      
		[     BYTE_PTR, [bt], ECX], //special for MOV*X
		[     BYTE_PTR, [wd], ECX], //special for MOV*X
		[     BYTE_PTR, [dw], ECX], //special for MOV*X
		[     BYTE_PTR, [BX], ECX], //special for MOV*X
		[     BYTE_PTR, [BX, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [BX, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [BX, DI], ECX], //special for MOV*X
		[     BYTE_PTR, [BX, DI, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [BX, DI, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, dw], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, EDI], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, EDI, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, EDI, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [EBX, EDI, dw], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, dw], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, EDI], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, EDI, bt], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, EDI, wd], ECX], //special for MOV*X
		[     BYTE_PTR, [4, EBX, EDI, dw], ECX], //special for MOV*X
		      
		[     [bt], CX    ],
		[     [wd], CX    ],
		[     [dw], CX    ],
		[     [BX], CX    ],
		[     [BX, bt], CX    ],
		[     [BX, wd], CX    ],
		[     [BX, DI], CX    ],
		[     [BX, DI, bt], CX    ],
		[     [BX, DI, wd], CX    ],
		[     [EBX], CX    ],
		[     [EBX, bt], CX    ],
		[     [EBX, wd], CX    ],
		[     [EBX, dw], CX    ],
		[     [EBX, EDI], CX    ],
		[     [EBX, EDI, bt], CX    ],
		[     [EBX, EDI, wd], CX    ],
		[     [EBX, EDI, dw], CX    ],
		[     [4, EBX], CX    ],
		[     [4, EBX, bt], CX    ],
		[     [4, EBX, wd], CX    ],
		[     [4, EBX, dw], CX    ],
		[     [4, EBX, EDI], CX    ],
		[     [4, EBX, EDI, bt], CX    ],
		[     [4, EBX, EDI, wd], CX    ],
		[     [4, EBX, EDI, dw], CX    ],
		      
		[     [bt], CL    ],
		[     [wd], CL    ],
		[     [dw], CL    ],
		[     [BX], CL    ],
		[     [BX, bt], CL    ],
		[     [BX, wd], CL    ],
		[     [BX, DI], CL    ],
		[     [BX, DI, bt], CL    ],
		[     [BX, DI, wd], CL    ],
		[     [EBX], CL    ],
		[     [EBX, bt], CL    ],
		[     [EBX, wd], CL    ],
		[     [EBX, dw], CL    ],
		[     [EBX, EDI], CL    ],
		[     [EBX, EDI, bt], CL    ],
		[     [EBX, EDI, wd], CL    ],
		[     [EBX, EDI, dw], CL    ],
		[     [4, EBX], CL    ],
		[     [4, EBX, bt], CL    ],
		[     [4, EBX, wd], CL    ],
		[     [4, EBX, dw], CL    ],
		[     [4, EBX, EDI], CL    ],
		[     [4, EBX, EDI, bt], CL    ],
		[     [4, EBX, EDI, wd], CL    ],
		[     [4, EBX, EDI, dw], CL    ],
		      
		[     [bt], EAX    ],
		[     [wd], EAX    ],
		[     [dw], EAX    ],
		      
		[     BYTE_PTR, [bt], EAX], //special for MOV*X
		[     BYTE_PTR, [wd], EAX], //special for MOV*X
		[     BYTE_PTR, [dw], EAX], //special for MOV*X
		      
		[     [bt], AX    ],
		[     [wd], AX    ],
		[     [dw], AX    ],
		      
		[     [bt], AL    ],
		[     [wd], AL    ],
		[     [dw], AL    ],
		      
		[     [bt], bt    ],
		[     [wd], bt    ],
		[     [dw], bt    ],
		[     [BX], bt    ],
		[     [BX, bt], bt    ],
		[     [BX, wd], bt    ],
		[     [BX, DI], bt    ],
		[     [BX, DI, bt], bt    ],
		[     [BX, DI, wd], bt    ],
		[     [EBX], bt    ],
		[     [EBX, bt], bt    ],
		[     [EBX, wd], bt    ],
		[     [EBX, dw], bt    ],
		[     [EBX, EDI], bt    ],
		[     [EBX, EDI, bt], bt    ],
		[     [EBX, EDI, wd], bt    ],
		[     [EBX, EDI, dw], bt    ],
		[     [4, EBX], bt    ],
		[     [4, EBX, bt], bt    ],
		[     [4, EBX, wd], bt    ],
		[     [4, EBX, dw], bt    ],
		[     [4, EBX, EDI], bt    ],
		[     [4, EBX, EDI, bt], bt    ],
		[     [4, EBX, EDI, wd], bt    ],
		[     [4, EBX, EDI, dw], bt    ],
		      
		[     WORD_PTR, [bt], bt    ],
		[     WORD_PTR, [wd], bt    ],
		[     WORD_PTR, [dw], bt    ],
		[     WORD_PTR, [BX], bt    ],
		[     WORD_PTR, [BX, bt], bt    ],
		[     WORD_PTR, [BX, wd], bt    ],
		[     WORD_PTR, [BX, DI], bt    ],
		[     WORD_PTR, [BX, DI, bt], bt    ],
		[     WORD_PTR, [BX, DI, wd], bt    ],
		[     WORD_PTR, [EBX], bt    ],
		[     WORD_PTR, [EBX, bt], bt    ],
		[     WORD_PTR, [EBX, wd], bt    ],
		[     WORD_PTR, [EBX, dw], bt    ],
		[     WORD_PTR, [EBX, EDI], bt    ],
		[     WORD_PTR, [EBX, EDI, bt], bt    ],
		[     WORD_PTR, [EBX, EDI, wd], bt    ],
		[     WORD_PTR, [EBX, EDI, dw], bt    ],
		[     WORD_PTR, [4, EBX], bt    ],
		[     WORD_PTR, [4, EBX, bt], bt    ],
		[     WORD_PTR, [4, EBX, wd], bt    ],
		[     WORD_PTR, [4, EBX, dw], bt    ],
		[     WORD_PTR, [4, EBX, EDI], bt    ],
		[     WORD_PTR, [4, EBX, EDI, bt], bt    ],
		[     WORD_PTR, [4, EBX, EDI, wd], bt    ],
		[     WORD_PTR, [4, EBX, EDI, dw], bt    ],
		      
		[     BYTE_PTR, [bt], bt    ],
		[     BYTE_PTR, [wd], bt    ],
		[     BYTE_PTR, [dw], bt    ],
		[     BYTE_PTR, [BX], bt    ],
		[     BYTE_PTR, [BX, bt], bt    ],
		[     BYTE_PTR, [BX, wd], bt    ],
		[     BYTE_PTR, [BX, DI], bt    ],
		[     BYTE_PTR, [BX, DI, bt], bt    ],
		[     BYTE_PTR, [BX, DI, wd], bt    ],
		[     BYTE_PTR, [EBX], bt    ],
		[     BYTE_PTR, [EBX, bt], bt    ],
		[     BYTE_PTR, [EBX, wd], bt    ],
		[     BYTE_PTR, [EBX, dw], bt    ],
		[     BYTE_PTR, [EBX, EDI], bt    ],
		[     BYTE_PTR, [EBX, EDI, bt], bt    ],
		[     BYTE_PTR, [EBX, EDI, wd], bt    ],
		[     BYTE_PTR, [EBX, EDI, dw], bt    ],
		[     BYTE_PTR, [4, EBX], bt    ],
		[     BYTE_PTR, [4, EBX, bt], bt    ],
		[     BYTE_PTR, [4, EBX, wd], bt    ],
		[     BYTE_PTR, [4, EBX, dw], bt    ],
		[     BYTE_PTR, [4, EBX, EDI], bt    ],
		[     BYTE_PTR, [4, EBX, EDI, bt], bt    ],
		[     BYTE_PTR, [4, EBX, EDI, wd], bt    ],
		[     BYTE_PTR, [4, EBX, EDI, dw], bt    ],
		
	].forEach( 
		function(arg)
		{
			Debug.show(fn(arg[0], arg[1], arg[2]));
		}
	);
	return NOP;
}

function Test()
{
	Debug.clear();
	/////////////////////////////////////////////////////////
	// [
		
	// ].forEach(
		// function(set)
		// {
			// Debug.show(XOR(set[0], set[1], set[2]));
		// }
	// );

	// Debug.show(NOP);
	// Debug.show(NOP);
	
	/////////////////////////////////////////////////////////
	// [
		
	// ].forEach(
		// function(val)
		// {
			// Debug.show(MUL(val));
		// }
	// );
	
	// Debug.show(NOP);
	// Debug.show(NOP);
	/////////////////////////////////////////////////////////
	// [
		// bt,
		// wd,
		// [bt    ],
		// [wd    ],
		// [dw    ],
		// [BX    ],
		// [BX, bt    ],
		// [BX, wd    ],
		// [BX, DI    ],
		// [BX, DI, bt    ],
		// [BX, DI, wd    ],
		// [EBX    ],
		// [EBX, bt    ],
		// [EBX, wd    ],
		// [EBX, dw    ],
		// [EBX, EDI    ],
		// [EBX, EDI, bt    ],
		// [EBX, EDI, wd    ],
		// [EBX, EDI, dw    ],
		// [4, EBX    ],
		// [4, EBX, bt    ],
		// [4, EBX, wd    ],
		// [4, EBX, dw    ],
		// [4, EBX, EDI    ],
		// [4, EBX, EDI, bt    ],
		// [4, EBX, EDI, wd    ],
		// [4, EBX, EDI, dw    ],
		
	// ].forEach(
		// function(val)
		// {
			// Debug.show(MUL(val, DSize.Word));
		// }
	// );
	
	// Debug.show(NOP);
	// Debug.show(NOP);
	/////////////////////////////////////////////////////////
	// [
		// BL,
		// BX,
		// EBX,
		// [bt    ],
		// [wd    ],
		// [dw    ],
		// [BX    ],
		// [BX, bt    ],
		// [BX, wd    ],
		// [BX, DI    ],
		// [BX, DI, bt    ],
		// [BX, DI, wd    ],
		// [EBX    ],
		// [EBX, bt    ],
		// [EBX, wd    ],
		// [EBX, dw    ],
		// [EBX, EDI    ],
		// [EBX, EDI, bt    ],
		// [EBX, EDI, wd    ],
		// [EBX, EDI, dw    ],
		// [4, EBX    ],
		// [4, EBX, bt    ],
		// [4, EBX, wd    ],
		// [4, EBX, dw    ],
		// [4, EBX, EDI    ],
		// [4, EBX, EDI, bt    ],
		// [4, EBX, EDI, wd    ],
		// [4, EBX, EDI, dw    ],
		
	// ].forEach(
		// function(val)
		// {
			// Debug.show(ROR(val, CL));//, DSize.Byte));
		// }
	// );
	
	return "90";
}