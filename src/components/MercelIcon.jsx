import styled from "styled-components";

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

function MercelIcon() {
  return (
    <IconWrapper>
      <StyledSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        {/* Shopping bag */}
        <path 
          d="M8 14 L8 24 Q8 26 10 26 L22 26 Q24 26 24 24 L24 14" 
          fill="none" 
          stroke="#0070f3" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Bag handle */}
        <path 
          d="M12 14 L12 12 Q12 8 16 8 Q20 8 20 12 L20 14" 
          fill="none" 
          stroke="#0070f3" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Sparkle */}
        <circle cx="25" cy="7" r="1" fill="#ffd814"/>
        <circle cx="27" cy="9" r="0.8" fill="#ffd814"/>
        <circle cx="23" cy="10" r="0.6" fill="#ffd814"/>
      </StyledSvg>
    </IconWrapper>
  );
}

export default MercelIcon;